import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth'
import Layout from '../layout/Layout'

class PrivateRoute extends React.Component{

    render(){
        const {component: Component, title, ...rest } = this.props;
        return (
            <Route 
                {...rest}
                render={
                    (props)=> firebase.auth().currentUser ? <Layout title ={title}> <Component {...props} /> </Layout>  : <Redirect to="/login"/>
                }        
                />
    
        )
    }
}

export default (PrivateRoute)