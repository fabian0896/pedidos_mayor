import React, {Component} from 'react';
import logo from '../../assets/fajas-logo.png';
import './Login.css'
import LoinForm from './LoginForm';
import firebase from 'firebase/app'
import 'firebase/auth'


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
        this.login(values.email, values.password).then(user =>{
            console.log("se conecto correctamente");actions.resetForm();
            actions.setSubmitting(false);
        })
        .catch(err =>{
            console.log("Usuario o clave incorrecta")
        }) 
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

export default Login;
