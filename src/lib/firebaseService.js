import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { formatPhone, randomColor } from './utilities'
import * as algolia from './algoliaService'



const CLIENTS = 'clients'


export function createCliente(client){
    
    const databaseRef = firebase.firestore().collection(CLIENTS);

    const phone = formatPhone(client.phone, client.country.callingCodes[0])
    const personalColor = randomColor(200,40)
    const createdAt = new Date();
    const seller = firebase.auth().currentUser.uid
    const country = client.country.translations.es || client.country.name

    const newClient = {
        ...client,
        phone,
        seller,
        personalColor,
        createdAt
    }

    const algoliaObject = {
        name: client.name,
        country,
        city: client.city,
        email: client.email,
        phone,
        seller
    }
    
    return new Promise( async (res,rej)=>{
        const myHandleError = handleError(rej)
        const documentSnapshot = await databaseRef.add(newClient).catch(myHandleError)
        algoliaObject['id'] = documentSnapshot.id
        const algoliaAdd = await algolia.addClient(algoliaObject).catch(myHandleError)
        const algoliaId = algoliaAdd.objectID
        await documentSnapshot.update({algoliaId}).catch(myHandleError)
        res('created')
    })
}





export function updateClient(id, client, cb){
    const databaseRef = firebase.firestore().collection(CLIENTS);

    const phone = formatPhone(client.phone, client.country.callingCodes[0])
    const country = client.country.translations.es || client.country.name


    const newClient = {
        ...client,
        phone,
        updatedAt: new Date()
    }

    const algoliaObject = {
        name: client.name,
        country,
        city: client.city,
        email: client.email,
        phone
    }

    return new Promise(async (res, rej)=>{
        const myHandleError = handleError(rej)
        const documentSnapshot = await databaseRef.doc(id).get().catch(myHandleError)
        const {algoliaId, seller} = documentSnapshot.data()
        algoliaObject['seller'] = seller
        await algolia.updateClient(algoliaId ,algoliaObject).catch(myHandleError)
        await documentSnapshot.ref.update(newClient).catch(myHandleError)
        res('updated')
    })
}


export function deleteClient(id){
    const databaseRef = firebase.firestore().collection(CLIENTS)
    return new Promise(async (res, rej) => {
        const myHandleError = handleError(rej)
        const documentSnapshot = await databaseRef.doc(id).get().catch(myHandleError)
        const {algoliaId} = documentSnapshot.data()
        await algolia.deleteUser(algoliaId).catch(myHandleError)
        await documentSnapshot.ref.delete().catch(myHandleError)
        res('deleted')
    })
}


export function createUpdateClient(client, id){
    return new Promise((res, rej) => {
        const myHandleError = handleError(rej)
        if(id){
            updateClient(id, client)
                .then((data)=> res(data))
                .catch(myHandleError)
        }else{
            createCliente(client)
                .then((data)=> res(data))
                .catch(myHandleError)
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



const handleError = (cb) => (err) =>{
    if(cb){
        cb(err)
    }else{
        console.log(err)
    }
}