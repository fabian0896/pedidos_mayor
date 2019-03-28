
const initialState = []

function clients(state = initialState, action){
    switch(action.type){
        case 'UPDATE_CLIENTS':{
            return action.payload.data
        }
        default:{
            return state
        }
    }
}

export default clients

