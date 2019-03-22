const initialState ={
    activate: false
}


function backButtom(state = initialState, action){
    switch(action.type){
        case 'ACTIVATE_BACKBUTTOM':{
            return {
                activate: true
            }
        }
        case 'HIDE_BACKBUTTOM':{
            return {
                activate: false
            }
        }
        default:
            return state
    }
}


export default backButtom;