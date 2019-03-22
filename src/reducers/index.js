import { combineReducers } from 'redux'
import user from './user'
import alert from './alert'
import backButtom from './backButtom'

const rootReducer = combineReducers({
    user,
    alert,
    backButtom
});

export default rootReducer;