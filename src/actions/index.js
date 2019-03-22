

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
