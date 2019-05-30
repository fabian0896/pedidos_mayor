import React, { Component } from 'react';
import Header from '../../componets/headerLayout/HeaderLayout'
import { Typography } from '@material-ui/core';
import NotificationHistory from './NotificationHistory';
import { setNotificationSeen } from '../../lib/firebaseService' 

class Notificaciones extends Component{

    componentDidMount(){
        document.title = "Notificaciones"
    }

    componentWillUnmount(){

        setNotificationSeen().then().catch()
    }
    
    render(){
        return(
            <div>
                <Header>
                    <Typography color="inherit" variant="h3" >Notificaciones</Typography>
                </Header>
                <NotificationHistory/>
            </div>
        )
    }
}



export default Notificaciones;