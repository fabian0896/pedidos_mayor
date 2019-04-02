import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ClientSearch from './ClientSearch'
import ClientList from './ClientList'
import { connect } from 'react-redux'
import { asyncUpdateClients, addRecentClients } from '../../actions'
import { Grid} from '@material-ui/core'
import TopClients from './TopClients';
import { searchClient } from '../../lib/searchService'

const styles = theme =>({
    input:{
        width: '100%'
    },
    header:{
        background: theme.palette.primary.light,
        height: '200px',
        marginLeft: `-${theme.spacing.unit*3}px`,
        marginRight: `-${theme.spacing.unit*3}px`,
        marginTop: `-${theme.spacing.unit*3}px`,
        marginBottom: `-${theme.spacing.unit*5}px`,
        padding: `${theme.spacing.unit*7}px ${theme.spacing.unit*3}px 0px`,
    }
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
        const { userId } = this.props
        const uid = checkValue? userId: null;

        if(!textValue && !uid){
            this.setState({results: [], isSearching: false})
            return
        }

        const data = await searchClient(uid, textValue)
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
                <div className={classes.header}>
                    <ClientSearch  
                        handleChangeCheckbox={ this.handleChangeCheckbox }
                        handleChangeInput={ this.handleChangeInput }
                        handleSubmit={ this.handleSubmit }
                        handleAddClient= {this.handleAddClient}
                        checkValue={ checkValue }
                        textValue={ textValue }
                        />
                </div>
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