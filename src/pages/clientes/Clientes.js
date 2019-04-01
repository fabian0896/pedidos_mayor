import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ClientSearch from './ClientSearch'
import ClientList from './ClientList'
import { connect } from 'react-redux'
import { asyncUpdateClients } from '../../actions'
import { Grid} from '@material-ui/core'
import TopClients from './TopClients';

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
        //this.props.asyncUpdateClients()
    }

    render(){
        const { checkValue, textValue } = this.state
        const { clients, classes } = this.props
        const clientList = Object.values(clients)
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
                        <TopClients />
                    </Grid>
                </Grid>
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