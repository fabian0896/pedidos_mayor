import React, { Component } from 'react';
import './App.css';
import Login from './pages/login/Login';
import { Switch, Redirect, withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth'
import { connect } from 'react-redux';
import {updateUser, deleteUser } from './actions'


import PrivateRoute from './componets/privateRoute/PrivateRoute';
import LoginRoute from './componets/loginRoute.js/LoginRoute';
import Alert from './componets/alert/Alert';


import Home from './pages/home/Home'
import Clientes from './pages/clientes/Clientes'
import Estadisticas from './pages/estadisticas/Estadisticas';
import Notificaciones from './pages/notificaciones/Notificaciones'
import Pagos from './pages/pagos/Pagos'
import Pedidos from './pages/pedidos/Pedidos'
import Prendas from './pages/prendas/Prendas'


class App extends Component {
  
  state ={
    loading: true
  }
  
  getUser = () => {
      firebase.auth().onAuthStateChanged((user) => {
      
      if(this.state.loading){
        this.setState({loading: false})
      }

      if (user) {
        //agregar el usuario al estado
        this.props.updateUser(user);
        this.props.history.push(this.ruta);
      } else {
        //retirar el usuario del estado
        this.props.deleteUser();
      }
    });
  }

  componentDidMount() {
    this.getUser();
    this.ruta = this.props.location.pathname;
  }


  render() {
    return (
        <div className="App">
        <Alert />
          {
            !this.state.loading &&
            <Switch>
                <PrivateRoute exact path="/inicio" component={Home}/>      
               <PrivateRoute exact path="/clientes" component={Clientes}/>      
                <PrivateRoute exact path="/estadisticas" component={Estadisticas}/>      
                <PrivateRoute exact path="/pagos" component={Pagos}/>      
                <PrivateRoute exact path="/pedidos" component={Pedidos}/>      
                <PrivateRoute exact path="/prendas" component={Prendas}/>
                <PrivateRoute exact path="/notificaciones" component={Notificaciones}/> 
                <LoginRoute exact path="/login" component={Login}/>
                <Redirect to="/inicio"/>
            </Switch>
          }
        </div>
    );
  }
}





function mapStateToProps(state, props) {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  updateUser,
  deleteUser,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
