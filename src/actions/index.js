import { getAllClients, getAllSellers } from '../lib/firebaseService';


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

//-------------------------- SEllers ------------------

export function addSellers(sellers){
    return{
        type: 'ADD_SELLERS',
        payload:{
            data: sellers
        }
    }
}


export function asyncAddSellers(){
    return dispatch =>{
        getAllSellers().then(sellers =>{
            dispatch(addSellers(sellers))
        })
        .catch(err => console.log(err))
    }
}


