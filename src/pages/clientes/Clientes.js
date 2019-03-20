import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ClientSearch from './ClientSearch'
import ClientList from './ClientList'

//objeto de clientes para hacer las pruebas
//este objeto vendra desde el estado global de la App que lo tomara de la base de datos
const clientes = [
    {   
        id: 1,
        name: 'Fabian David Dueñas',
        seller_id: 3
    },
    {
        id: 2,
        name: 'Alberto Mora',
        seller_id: 1
    },
    {   
        id: 3,
        name: 'Pepe Gonsales',
        seller_id: 1
    },
    {   
        id: 4,
        name: 'Ingrid Popayan',
        seller_id: 2
    },
    {   
        id: 5,
        name: 'Vanessa Cardona Davila',
        seller_id: 2
    },
]

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

    filter = (clients, all, name) =>{
        return clients.filter(client =>{
            let nameValue = false;
            let justMe = client.seller_id === mySellerId; // cambiar el mySellerId por uid de firebase
        
            if(name && all){
                nameValue = client.name.toLowerCase().includes(name.toLowerCase())
                return nameValue
            } else if(name && !all){
                nameValue = client.name.toLowerCase().includes(name.toLowerCase())
                return nameValue && justMe
            } else if(!all){
                return justMe;
            }
            return true;
        })
    }
        
    render(){
        const { checkValue, textValue } = this.state
        const clientsFilter = this.filter(clientes, !checkValue, textValue)

        return(
            <div>
                <ClientSearch  
                    handleChangeCheckbox={ this.handleChangeCheckbox }
                    handleChangeInput={ this.handleChangeInput }
                    handleSubmit={ this.handleSubmit }
                    checkValue={ checkValue }
                    textValue={ textValue }
                    />
                <ClientList
                    handleClickVerMas={this.handleClickVerMas} 
                    clients={clientsFilter} />
            </div>
        )
    }
}



export default withStyles(styles)(Clientes);