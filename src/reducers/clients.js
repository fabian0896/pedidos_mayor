
const initialState = {
    all: {},
    recent: {},
    top: []
}

function clients(state = initialState, action){
    switch(action.type){
        case 'UPDATE_CLIENTS':{
            return {
                ...state,
                all:{
                    ...action.payload.data
                }
            }
        }
        case 'ADD_RECENT_CLIENTS':{
            return {
                ...state,
                recent:{
                    ...action.payload.data
                }
            }
        }
        case 'ADD_TOP_CLIENTS':{
            return {
                ...state,
                top: action.payload.data
            }
        }
        case 'RESET_CLIENTS':{
            return initialState
        }
        default:{
            return state
        }
    }
}

export default clients

