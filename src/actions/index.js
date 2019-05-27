import { 
    getAllClients, 
    getAllSellers,
    getLastClients,
    getAllProducts,
    getLastProducts,
    getAllOrders as firebaseGetAllOrders,
    getAllNotifications as firebaseGetNotifications
} from '../lib/firebaseService';


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


export function updateTopClients(clients){
    return{
        type: 'ADD_TOP_CLIENTS',
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

            const clientList = Object.keys(data).map(id=>data[id])
            const topClient = clientList.filter(item=>!!item.totalOrders).sort((a,b)=>{
                return b - a
            })
            
            dispatch(updateTopClients(topClient.slice(0,5)))
            dispatch(updateClients(data))

        })
        
    }
}

export function addRecentClients(){
    return dispatch => {
        getLastClients().then(data =>{
            dispatch({
                type: 'ADD_RECENT_CLIENTS',
                payload:{
                    data
                }
            })
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

//-----------------Products -----------------

export function addAllProducts(){
    return dispatch => {
        getAllProducts().then(data => {
            dispatch({
                type: 'ADD_PRODUCTS',
                payload:{
                    data
                }
            })
        })
        .catch(err =>{
            console.log(err)
        })
    }
}

export function addRecentProducts(){
    return dispatch =>{
        getLastProducts().then(data=>{
            dispatch({
                type: 'ADD_RECENT_PRODUCTS',
                payload:{
                    data
                }
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

//------------------------Orders -------------------------


export function getAllOrders(){
    return dispatch => {
        firebaseGetAllOrders().then(data=>{
            dispatch({
                type: 'ADD_ALL_ORDERS',
                payload:{
                    data
                }
            })
        }).catch(err => console.log(err))
    }
}


// --------------------- Notifications ----------------

export function setNotSeenNotificationsCount(data){
    return {
        type: 'UPDATE_NOT_SEEN_COUNT',
        payload:{
            data
        }
    }
}

export function setAllNotifications(data){
    return{
        type: 'SET_ALL_NOTIFICATIONS',
        payload:{
            data
        }
    }
}


export function getAllNotifications(){
    return dispatch =>{
        firebaseGetNotifications().then(data=>{
            dispatch(setAllNotifications(data))
        })
    }
}
