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


export function updateClient(id, client, cb){
    const database = firebase.firestore();

    const newPhone = formatPhone(client.phone, client.country.callingCodes[0])

    const newClient = {
        ...client,
        phone: newPhone,
        updatedAt: new Date()
    }

    database.collection(CLIENTS).doc(id).update(newClient)
        .then(()=>{
            cb()
        })
        .catch(err => {
        cb(err) 
        })
}

export function createUpdateClient(client, id){
    return new Promise((res, rej)=>{
        if(id){
            updateClient(id, client, (err)=>{
                if(err){
                    rej(err)
                }else{
                    res()
                }
            })
        }else{
            createCliente(client, (err)=>{
                if(err){
                    rej(err)
                }else{
                    res()
                }
            })
        }
    })
}




export function getAllClients(cb){   
    firebase.firestore().collection(CLIENTS).orderBy('name','asc')
        .onSnapshot(querySnapshot => {
            const clientsList = {}
            querySnapshot.forEach(doc => {
                clientsList[doc.id] = {id: doc.id, ...doc.data()}
            })
            cb(null, clientsList)
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