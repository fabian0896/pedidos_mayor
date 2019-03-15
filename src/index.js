import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app'
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './reducers';
import { BrowserRouter } from 'react-router-dom'


const store = createStore(rootReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

firebase.initializeApp({
    apiKey: "AIzaSyA-cV0x42-xB_Nnk3UFbN5VYf8P7qiYd9o",
    authDomain: "pedidos-mayor.firebaseapp.com",
    databaseURL: "https://pedidos-mayor.firebaseio.com",
    projectId: "pedidos-mayor",
    storageBucket: "pedidos-mayor.appspot.com",
    messagingSenderId: "320580183648"    
});







ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
