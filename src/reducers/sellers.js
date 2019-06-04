const initialState = null

function sellers(state = initialState, action){
    switch(action.type){
        case 'ADD_SELLERS':{
            return action.payload.data
        }
        case 'RESET_SELLERS':{
            return initialState
        }
        default:{
            return state
        }
    }
}

export default sellers;