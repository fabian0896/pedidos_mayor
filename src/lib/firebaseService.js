import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { formatPhone } from './utilities'


const CLIENTS = 'clients'


export function createCliente(client, cb){
    const database = firebase.firestore();

    const newPhone = formatPhone(client.phone, client.country.callingCodes[0])

    const newClient = {
        ...client,
        phone: newPhone,
        seller: firebase.auth().currentUser.uid,
        createdAt: new Date()
    }
    
    database.collection(CLIENTS).add(newClient)
        .then(()=>{
            cb()
        })
        .catch(err => {
           cb(err) 
        })
}


