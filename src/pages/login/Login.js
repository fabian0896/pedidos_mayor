import React, {Component} from 'react';
import logo from '../../assets/fajas-logo.png';
import './Login.css'
import LoinForm from './LoginForm';
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { showAlert, hideAlert } from '../../actions'
import { createSeller } from '../../lib/firebaseService.js'
 

class Login extends Component{

    state = {
        register: false
    }

    handleChangeRegister = ()=>{
        this.setState({register: !this.state.register});
    }

    login = async (email, password) =>{
        const user =  await firebase.auth().signInWithEmailAndPassword(email, password);
        return user;
     }
    
    handelSubmint = (values, actions) =>{ 
        const { register } = this.state
        if(register){
            createSeller(values).catch(errMesaje=>{
                this.props.showAlert('error', errMesaje);
            })
        }else{
            this.login(values.email, values.password).catch(err =>{
                this.props.showAlert('error', 'Usuario o clave incorrectas');
            }) 
        }
        actions.resetForm();
        actions.setSubmitting(false);  
      }
    

    render(){
        return(
            <div className="text-center Login-root">
                <LoinForm 
                    logo={logo} 
                    handelSubmint={this.handelSubmint}
                    handleChangeRegister={this.handleChangeRegister}
                    register={this.state.register} />
            </div>
        )
    }
}

const mapDispatchToProps ={
    showAlert,
    hideAlert
}

export default connect(null, mapDispatchToProps)(Login);
