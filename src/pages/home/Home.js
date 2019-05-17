import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth'
import { getUnSeeNotifications } from '../../lib/firebaseService'

class Home extends Component{

    logOut = ()=>{
        firebase.auth().signOut()
            .then(()=> console.log("salida correcta"))
            .catch(err => console.log(err));
    }

    componentDidMount(){
        this.clearFunction = getUnSeeNotifications(data=>{
            console.log(data)
        })
    }


    componentWillUnmount(){
        this.clearFunction()
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