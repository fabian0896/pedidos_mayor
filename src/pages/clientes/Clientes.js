import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ClientSearch from './ClientSearch'
import ClientList from './ClientList'


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
            search: `?name=${ this.state.textValue || 'null' }&all=${ !this.state.checkValue }`,
        })
    }
    
    
    render(){
        const { checkValue, textValue } = this.state
        const { location } = this.props
        const params = new URLSearchParams(location.search)
        console.log(params.get('name'))        
        
        return(
            <div>
                <ClientSearch  
                    handleChangeCheckbox={ this.handleChangeCheckbox }
                    handleChangeInput={ this.handleChangeInput }
                    handleSubmit={ this.handleSubmit }
                    checkValue={ checkValue }
                    textValue={ textValue }
                    />
                <ClientList />
            </div>
        )
    }
}



export default withStyles(styles)(Clientes);