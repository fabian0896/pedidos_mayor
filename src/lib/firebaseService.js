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
        personalColor: randomColor(200,40),
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
    firebase.firestore().collection(CLIENTS).orderBy('name','asc').get()
            .then(querySnapshot =>{
                querySnapshot.forEach(doc => {
                    clientsList.push({id: doc.id, ...doc.data()})
                })
                cb(null, clientsList)
            })
            .catch(err => {
                cb(err)
            })
}


export function getClientById(id, callback){
    return firebase.firestore().collection(CLIENTS).doc(id).get()
        .then(doc=>{
            if(doc.exists){
                callback(null, {id: doc.id,...doc.data()})
            } else{
                callback(null, null)
            }
        }) 
        .catch(err =>{
            callback(err, null)
        })   
}