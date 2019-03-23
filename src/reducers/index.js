import { combineReducers } from 'redux'
import user from './user.js'
import alert from './alert.js'
import backButtom from './backButtom.js'

const rootReducer = combineReducers({
    user,
    alert,
    backButtom
});

export default rootReducer;