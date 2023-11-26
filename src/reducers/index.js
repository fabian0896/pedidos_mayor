import { combineReducers } from 'redux'
import user from './user.js'
import alert from './Alert.js'
import backButtom from './backButtom.js'
import clients from './clients'
import sellers from './sellers'
import products from './products'
import orders from './orders'
import notifications from './notifications'

const rootReducer = combineReducers({
    user,
    alert,
    backButtom,
    clients,
    sellers,
    products,
    orders,
    notifications
});

export default rootReducer;