const initialState = {}


function user(state = initialState, action){
    switch(action.type){
        case 'UPDATE_USER':{
            return {
                ...action.payload.user
            }
        }
        case 'DELETE_USER': {
            return null
        }
        default:
            return state;
    }
}


export default user;