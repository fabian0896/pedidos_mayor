import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ClientSearch from './ClientSearch'
import ClientList from './ClientList'
import { connect } from 'react-redux'
import { asyncUpdateClients, addRecentClients } from '../../actions'
import { Grid, Paper} from '@material-ui/core'
import TopClients from './TopClients';
import { searchClientsIds } from '../../lib/searchService'
import HeaderLayout from '../../componets/headerLayout/HeaderLayout'
import NoFindMessage from '../../componets/noFindMessage/NoFindMessage'
import Loader from '../../componets/loader/Loader'
import { Search as SearchIcon } from '@material-ui/icons'

const styles = theme =>({
    input:{
        width: '100%'
    },
    gridPadding:{
        [theme.breakpoints.down('xs')]:{
            padding: 0
        }
    }
})


class Clientes extends Component{
    
    state = {
        checkValue: false,
        textValue: '',
        results: [],
        isSearching: false,
        loadingSearch: false
    }
    
    handleChangeCheckbox = event => {
        const value = event.target.checked
        this.setState({ checkValue: value }, ()=>{
            this.handleSubmit()
        })      
    }

    handleChangeInput = event =>{
        this.setState({textValue: event.target.value });
    }

    handleAddClient = ()=>{
        this.props.history.push('/clientes/nuevo')
    }

    handleSubmit = async event => {
        event && event.preventDefault();
        const { textValue, checkValue } = this.state
        const { userId, clients } = this.props
        const uid = checkValue? userId: null;
        this.setState({loadingSearch: false})
        if(!textValue && !uid){
            this.setState({results: [], isSearching: false})
            return
        }
        //const data = await searchClient(uid, textValue)
        this.setState({loadingSearch: true})
        const clientsIds = await searchClientsIds(uid, textValue)
        const data = clientsIds.map(id =>{
            return clients[id]
        })
        this.setState({results: data, isSearching: true, loadingSearch: false})
        return
    }

    handleClickVerMas = id => () => {
        this.props.history.push(`/clientes/${id}`);
    }

    
    componentDidMount(){
        this.props.addRecentClients()
        //getAllClients()
        //this.props.asyncUpdateClients()
    }

    render(){
        const { checkValue, textValue, isSearching, results, loadingSearch } = this.state
        const { clients, recent, classes } = this.props
        let clientList
        if(isSearching){
            clientList = results
        }else{
            clientList = Object.keys(clients).map( id => clients[id])
        }        

        return(
            <div>
                <HeaderLayout >
                    <ClientSearch  
                        handleChangeCheckbox={ this.handleChangeCheckbox }
                        handleChangeInput={ this.handleChangeInput }
                        handleSubmit={ this.handleSubmit }
                        handleAddClient= {this.handleAddClient}
                        checkValue={ checkValue }
                        textValue={ textValue }
                        />
                </HeaderLayout>
                <Grid className={classes.gridPadding} container spacing={24}>
                    {   
                        loadingSearch &&
                         <Grid item xs={12} sm={12} md={9}>
                            <Paper>
                                <Loader
                                    floating 
                                    loadingText="Buscando Cliente"
                                    successText="estos son los resultados..."
                                    Icon={SearchIcon}
                                    success={false}
                                    loading={true} />
                            </Paper>
                         </Grid>
                    }
                    {
                        !loadingSearch &&
                        <Grid item xs={12} sm={12} md={9}>
                            {
                                (isSearching && !clientList.length) ?
                                <NoFindMessage
                                    message="No se encontro el clinete"
                                    subMessage="Pero no dudes en agragarlo"
                                    callToAction="Agragar Cliente"
                                    cta={this.handleAddClient}
                                />
                                :
                                <ClientList
                                    handleClickVerMas={this.handleClickVerMas} 
                                    clients={clientList} />
                            }
                        
                        </Grid>
                    }
                    <Grid item xs={12} md={3}>
                        <TopClients
                            handleClick={this.handleClickVerMas} 
                            recent={recent} 
                            top={recent}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}



const mapDispatchToProps = {
    asyncUpdateClients,
    addRecentClients
}

const mapStateToProps = (state, props) => {
    return {
        userId: state.user.uid,
        clients: state.clients.all,
        recent: state.clients.recent
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Clientes));