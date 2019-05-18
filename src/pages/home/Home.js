import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth'

class Home extends Component{

    logOut = ()=>{
        firebase.auth().signOut()
            .then(()=> console.log("salida correcta"))
            .catch(err => console.log(err));
    }

    componentDidMount(){
        
    }


    componentWillUnmount(){
       
    }

    render(){
        return(
            <div >
                Hola desde Home 
            </div>
        )
    }
}

export default Home;