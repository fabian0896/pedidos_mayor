


// types: primary, secundary, success, danger, warning, info, light, dark
const initialState = {
    type: 'danger',
    message: 'default message',
    show: false
}

function alert(state = initialState, action){
    switch(action.type){
        case 'SHOW_ALERT':{
            return {
                type: action.payload.type,
                message: action.payload.message,
                show: true
            }
        }
        case 'HIDE_ALERT':{
            return {
                ...state.alert,
                show: false
            }
        }
        default:
            return state;
    }
}

export default alert;