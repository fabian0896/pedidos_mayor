import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth'
import Header from '../../componets/headerLayout/HeaderLayout'
import { Typography } from '@material-ui/core';
import Frases from '../../componets/frases/Frases'
import Title from '../../componets/title/Title'

class Home extends Component{

    componentDidMount(){
        
    }


    componentWillUnmount(){
       
    }

    render(){
        return(
            <div >
                <Header>
                    <Typography variant="h1" color="inherit">Inicio</Typography>
                </Header>
                <Frases/>
                <Title align="right" primary="Pedidos" secondary="Pedidos Listo para despachar" />
            </div>
        )
    }
}

export default Home;