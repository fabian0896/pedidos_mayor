import React, { Component } from 'react';
import './App.css';
import Login from './pages/login/Login';
import { Switch, Redirect, withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth'
import { connect } from 'react-redux';
import {updateUser, deleteUser } from './actions'

import Home from './pages/home/Home'
import PrivateRoute from './componets/privateRoute/PrivateRoute';
import LoginRoute from './componets/loginRoute.js/LoginRoute';
import Alert from './componets/alert/Alert';


class App extends Component {
  
  state ={
    loading: true
  }
  
  getUser = () => {
      firebase.auth().onAuthStateChanged((user) => {
      
      this.setState({loading: false})

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
                <PrivateRoute exact path="/home" component={Home}/>
                <LoginRoute exact path="/login" component={Login}/>
                <Redirect to="/home"/>
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
