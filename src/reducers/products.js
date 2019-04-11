const initialState = {
    all: {},
    recent: {}
}

function products(state = initialState, action){
    switch(action.type){
        case 'ADD_PRODUCTS':{
            return {
                ...state,
                all: action.payload.data
            }
        }
        case 'ADD_RECENT_PRODUCTS':{
            return{
                ...state,
                recent: action.payload.data
            }
        }
        default:{
            return state
        }
    }
}

export default products