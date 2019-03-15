import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth'



class Home extends Component{

    logOut = ()=>{
        firebase.auth().signOut()
            .then(()=> console.log("salida correcta"))
            .catch(err => console.log(err));
    }

    render(){
        return(
            <div>
                <button className="btn btn-outline-danger" onClick={this.logOut}>Salir</button>
            </div>
        )
    }
}

export default Home;