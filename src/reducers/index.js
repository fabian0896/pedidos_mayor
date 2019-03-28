import { combineReducers } from 'redux'
import user from './user.js'
import alert from './alert.js'
import backButtom from './backButtom.js'
import clients from './clients'

const rootReducer = combineReducers({
    user,
    alert,
    backButtom,
    clients
});

export default rootReducer;