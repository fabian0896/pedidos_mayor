const initialState ={
    activate: false,
    path: null
}


function backButtom(state = initialState, action){
    switch(action.type){
        case 'ACTIVATE_BACKBUTTOM':{
            return {
                activate: true,
                path: action.payload.path
            }
        }
        case 'HIDE_BACKBUTTOM':{
            return {
                activate: false,
                path: null
            }
        }
        default:
            return state
    }
}


export default backButtom;