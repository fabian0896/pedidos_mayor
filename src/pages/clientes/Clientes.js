import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ClientSearch from './ClientSearch'
import ClientList from './ClientList'
import { connect } from 'react-redux'
import { asyncUpdateClients, addRecentClients } from '../../actions'
import { Grid} from '@material-ui/core'
import TopClients from './TopClients';
import { searchClient, searchClientsIds } from '../../lib/searchService'
import HeaderLayout from '../../componets/headerLayout/HeaderLayout'

const styles = theme =>({
    input:{
        width: '100%'
    },
})


class Clientes extends Component{
    
    state = {
        checkValue: false,
        textValue: '',
        results: [],
        isSearching: false
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

        if(!textValue && !uid){
            this.setState({results: [], isSearching: false})
            return
        }
        //const data = await searchClient(uid, textValue)
        const clientsIds = await searchClientsIds(uid, textValue)
        const data = clientsIds.map(id =>{
            return clients[id]
        })
        this.setState({results: data, isSearching: true})
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
        const { checkValue, textValue, isSearching, results } = this.state
        const { clients, classes, recent } = this.props
        let clientList
        if(isSearching){
            clientList = results
        }else{
            clientList = Object.values(clients)
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
                <Grid container spacing={24}>
                    <Grid item md={9}>
                        <ClientList
                            handleClickVerMas={this.handleClickVerMas} 
                            clients={clientList} />
                    
                    </Grid>
                    <Grid item md={3}>
                        <TopClients
                            handleClick={this.handleClickVerMas} 
                            recent={recent} 
                            top={{}}/>
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