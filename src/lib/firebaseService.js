import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { formatPhone, randomColor } from './utilities'
import * as algolia from './algoliaService'



const CLIENTS = 'clients'
const CODES = 'codes'
const SELLERS = 'sellers'


//---------------------------------------------CLients -------------------------------------------


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
        algoliaObject['objectID'] = documentSnapshot.id
        const algoliaAdd = await algolia.addClient(algoliaObject).catch(myHandleError)
        //const algoliaId = algoliaAdd.objectID
        //await documentSnapshot.update({algoliaId}).catch(myHandleError)
        res('created')
        return
    })
}





export function updateClient(id, client){
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
        //const documentSnapshot = await databaseRef.doc(id).get().catch(myHandleError)
        await databaseRef.doc(id).update(newClient).catch(myHandleError)
        await algolia.updateClient(id ,algoliaObject).catch(myHandleError)
        res('updated')
        return
    })
}


export function deleteClient(id){
    const databaseRef = firebase.firestore().collection(CLIENTS)
    return new Promise(async (res, rej) => {
        const myHandleError = handleError(rej)
        await databaseRef.doc(id).delete().catch(myHandleError)
        await algolia.deleteUser(id).catch(myHandleError)
        res('deleted')
        return
    })
}


export function createUpdateClient(client, id){
    return new Promise(async (res, rej) => {
        const myHandleError = handleError(rej)
        if(id){
            const updateRes = await updateClient(id, client).catch(myHandleError)
            res(updateRes)
            return
        }else{
            const createRes = await createCliente(client).catch(myHandleError)
            res(createRes)
            return
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


export async function getClientById(id, callback){
    const snap = await firebase.firestore().collection(CLIENTS).doc(id).get().catch(err =>{throw  Error(err)})
    if(snap.exists){
        return {id: snap.id, ...snap.data()}
    }else{
        return null
    }
}

//------------------------------------------ SELLERS-------------------------------------------------------


export async function registerUSer(email, password){
    const snap = await firebase.auth().createUserWithEmailAndPassword(email, password)
    return snap.user.uid
}


export function createSeller({email, password, code, name}){
    return new Promise(async (res, rej)=>{
        const codes = await getCodes()
        const matchCode = codes.find(actualCode => actualCode.value === code)
        if(!matchCode){
            rej("El codigo de registro es invalido")
            return
        }
        const uid = await registerUSer(email, password).catch(()=>{
            rej("no se pudo crear el usuario con el correo espesificado")
            return
        })
        if(uid){
            await firebase.firestore().collection(SELLERS).doc(uid).set({
                name,
                email,
            })
            res("se creo el usuario correctamente")
        }
        return
    })
}


export function getCodes(){
    return new Promise(async (res, rej)=>{
       const myHandleError = handleError(rej)
       const codes = [] 
       const snap = await firebase.firestore().collection(CODES).get().catch(myHandleError)
       snap.forEach(code => {
           codes.push(code.data())
       })
       res(codes)
       return
    })
}

//-------------------------------------------- Handle Error ----------------------------------------------

const handleError = (cb) => (err) =>{
    if(cb){
        cb(err)
    }else{
        console.log(err)
    }
}