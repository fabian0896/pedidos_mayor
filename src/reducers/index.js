import { combineReducers } from 'redux'
import user from './user.js'
import alert from './alert.js'
import backButtom from './backButtom.js'
import clients from './clients'
import sellers from './sellers'
import products from './products'

const rootReducer = combineReducers({
    user,
    alert,
    backButtom,
    clients,
    sellers,
    products
});

export default rootReducer;