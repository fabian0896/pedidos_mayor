import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { formatPhone, randomColor } from './utilities'


const CLIENTS = 'clients'


export function createCliente(client, cb){
    const database = firebase.firestore();

    const newPhone = formatPhone(client.phone, client.country.callingCodes[0])

    const newClient = {
        ...client,
        phone: newPhone,
        seller: firebase.auth().currentUser.uid,
        personalColor: randomColor(200),
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


export function getAllClients(cb){
    const clientsList = []
    firebase.firestore().collection('clients').get()
            .then(querySnapshot =>{
                querySnapshot.forEach(doc => {
                    clientsList.push(doc.data())
                    console.log(doc.data())
                })
                console.log('se realizo el dispatch')
            })
            .catch(err => {
                console.log(err)
            })
}


