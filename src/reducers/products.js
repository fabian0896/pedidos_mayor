const initialState = {
    all: {}
}

function products(state = initialState, action){
    switch(action.type){
        case 'ADD_PRODUCTS':{
            return {
                ...state,
                all: action.payload.data
            }
        }
        default:{
            return state
        }
    }
}

export default products