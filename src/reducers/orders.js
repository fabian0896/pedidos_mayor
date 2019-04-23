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
        default:{
            return state
        }
    }
}


export default orders