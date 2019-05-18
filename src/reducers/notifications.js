const initialState = {
    notSeenCount: 0,
    all: []
}


function notifications(state=initialState, action){
    switch(action.type){
        case 'UPDATE_NOT_SEEN_COUNT':{
            return {
                ...state,
                notSeenCount: action.payload.data
            }
        }
        case 'SET_ALL_NOTIFICATIONS':{
            return{
                ...state,
                all: action.payload.data
            }
        }
        default:{
            return state
        }
    }
}


export default notifications