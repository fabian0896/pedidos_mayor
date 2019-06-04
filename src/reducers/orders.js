const initialState = {
    all:{}
}


function orders(state=initialState, action){
    switch(action.type){
        case 'ADD_ALL_ORDERS':{
            return {
                ...state,
                all:{
                    ...state.all,
                    ...action.payload.data
                }
            }
        }
        case 'RESET_ORDER':{
            return initialState
        }
        default:{
            return state
        }
    }
}


export default orders