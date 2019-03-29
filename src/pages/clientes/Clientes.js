import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ClientSearch from './ClientSearch'
import ClientList from './ClientList'
import { connect } from 'react-redux'
import { asyncUpdateClients } from '../../actions'




const mySellerId = 1;


const styles = theme =>({
    input:{
        width: '100%'
    }
})


class Clientes extends Component{
    
    state = {
        checkValue: false,
        textValue: ''
    }
    
    handleChangeCheckbox = event => {
        const value = event.target.checked
        this.setState({ checkValue: value })
    }

    handleChangeInput = event =>{
        this.setState({textValue: event.target.value });
    }

    handleAddClient = ()=>{
        this.props.history.push('/clientes/nuevo')
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.history.push({
            pathname: "/clientes",
            search: `?name=${ this.state.textValue }&all=${ !this.state.checkValue }`,
        })
    }

    handleClickVerMas = id => () => {
        this.props.history.push(`/clientes/${id}`);
    }

    
    componentDidMount(){
        //getAllClients()
        this.props.asyncUpdateClients()
    }

    render(){
        const { checkValue, textValue } = this.state
        const { clients } = this.props
        const clientList = Object.values(clients)
        return(
            <div>
                <ClientSearch  
                    handleChangeCheckbox={ this.handleChangeCheckbox }
                    handleChangeInput={ this.handleChangeInput }
                    handleSubmit={ this.handleSubmit }
                    handleAddClient= {this.handleAddClient}
                    checkValue={ checkValue }
                    textValue={ textValue }
                    />
                <ClientList
                    handleClickVerMas={this.handleClickVerMas} 
                    clients={clientList} />
            </div>
        )
    }
}

const mapDispatchToProps = {
    asyncUpdateClients
}

const mapStateToProps = (state, props) => {
    return {
        clients: state.clients
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Clientes));