import firebase from 'firebase/app'
import 'firebase/firestore'
import { UpdateSharp } from '@material-ui/icons';
import { getAllClients } from '../lib/firebaseService';


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

export function showBackButtom(path){
    return{
        type: 'ACTIVATE_BACKBUTTOM',
        payload:{
            path: path
        }
    }
}

export function showBackbuttonWithPath(path){
    return ()=> showBackButtom(path)
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


export const asyncUpdateClients = ()=>{
    return (dispatch) => {
        getAllClients((err, data)=>{
            if(err){
                console.log(err)
                return
            }
            dispatch(updateClients(data))
        })
        
    }
}




