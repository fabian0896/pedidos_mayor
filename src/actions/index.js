import firebase from 'firebase/app'
import 'firebase/firestore'
import { UpdateSharp } from '@material-ui/icons';


// -------------------------- User -----------------------------

export function updateUser(user){
    return{
        type: 'UPDATE_USER',
        payload: {
            user
        }
    }
}

export function deleteUser(){
    return {
        type: 'DELETE_USER',
        payload:{}
    }
}


// ---------------------------- Alert ---------------------------

export function showAlert(type, message){
    return{
        type: 'SHOW_ALERT',
        payload: {
            type,
            message
        }
    }
}


export function hideAlert(){
    return{
        type: 'HIDE_ALERT'
    }
}


// ------------------------ Back Buttom ---------------------

export function showBackButtom(){
    return{
        type: 'ACTIVATE_BACKBUTTOM'
    }
}

export function hideBackButtom(){
    return{
        type: 'HIDE_BACKBUTTOM'
    }
}



//-------------------------- Clients -------------------------

export function updateClients(clients){
    return{
        type: 'UPDATE_CLIENTS',
        payload:{
            data: clients
        }
    }
}


export function asyncUpdateClients(){
    console.log("se ejecuto")
    return (dispatch) => {
        console.log('entreeee')
        dispatch(updateClients(['hola', 'mundo']))
    }
}




