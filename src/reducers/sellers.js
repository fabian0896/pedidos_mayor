const initialState = null

function sellers(state = initialState, action){
    switch(action.type){
        case 'ADD_SELLERS':{
            return action.payload.data
        }
        default:{
            return state
        }
    }
}

export default sellers;