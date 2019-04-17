import React, { Component } from 'react';
import './App.css';
import Login from './pages/login/Login';
import { Switch, Redirect, withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth'
import { connect } from 'react-redux';
import {updateUser, deleteUser, asyncUpdateClients, asyncAddSellers } from './actions'


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
import ClientDetail from "./pages/clientes/clientDetails/ClientDetails"
import NewClient from './pages/clientes/newClient/NewClient'
import NewProductMobile from './pages/prendas/newProductMobile/NewProductMovile';
import OrderDetails from './pages/pedidos/orderDetails/OrderDetails';
import NewOrder from './pages/pedidos/newOrder/NewOrder';




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
    this.props.asyncUpdateClients()
    this.props.asyncAddSellers()
    this.ruta = this.props.location.pathname;
  }


  render() {
    return (
        <div className="App">
        <Alert />
          {
            !this.state.loading &&
            <Switch>
                <PrivateRoute title="Inicio" exact path="/inicio" component={Home}/>      
                <PrivateRoute title="Nuevo Cliente" exact path="/clientes/nuevo" component={NewClient}/>      
                <PrivateRoute title="Clientes" exact path="/clientes/:id" component={ClientDetail}/>      
                <PrivateRoute title="Clientes" exact path="/clientes" component={Clientes}/>      
                <PrivateRoute title="Estadisticas" exact path="/estadisticas" component={Estadisticas}/>      
                <PrivateRoute title="Pagos" exact path="/pagos" component={Pagos}/>      
                <PrivateRoute title="Pedidos" exact path="/pedidos/nuevo" component={NewOrder}/>      
                <PrivateRoute title="Pedidos" exact path="/pedidos/:id" component={OrderDetails}/>      
                <PrivateRoute title="Pedidos" exact path="/pedidos" component={Pedidos}/>      
                <PrivateRoute title="Prendas" exact path="/prendas/nueva" component={NewProductMobile}/>
                <PrivateRoute title="Prendas" exact path="/prendas" component={Prendas}/>
                <PrivateRoute title="Notificaciones" exact path="/notificaciones" component={Notificaciones}/> 
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
  asyncUpdateClients,
  asyncAddSellers
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
