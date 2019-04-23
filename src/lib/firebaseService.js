import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { formatPhone, randomColor, incrementSerial } from './utilities'
import * as algolia from './algoliaService'
import { convertCurrency } from './currencyService'




const CLIENTS = 'clients'
const CODES = 'codes'
const SELLERS = 'sellers'
const PRODUCTS = 'products'
const ORDERS = 'orders'


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
        await algolia.addClient(algoliaObject).catch(myHandleError)
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

export async function getLastClients(){
    const snap = await firebase.firestore().collection(CLIENTS).orderBy('createdAt', 'desc').limit(5).get()
    const res = {}
    snap.forEach(doc => {
        res[doc.id] = {...doc.data(), id: doc.id}
    })
    return res
}

//------------------------------------------ SELLERS-------------------------------------------------------


export async function getAllSellers(){
    const snap = await firebase.firestore().collection(SELLERS).get()
    const sellers = {}
    snap.forEach(seller=>{
        sellers[seller.id] = seller.data()
    })
    return sellers;
}


export async function getSellerById(id){
    const seller = await firebase.firestore().collection(SELLERS).doc(id).get()
    if(seller.exists){
        return seller.data()
    }
    return null
}

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
       const snap = await firebase.firestore().collection(CODES).doc('registerCode').get().catch(myHandleError)
       return [snap.data()]
    })
}

//---------------------------------------------Products ---------------------------------------------

export async function addProduct(product){
    const ref =  firebase.firestore().collection(PRODUCTS)
    const uid = firebase.auth().currentUser.uid
    const lineName = product.line.value || product.line
    const newProduct = {
        ...product,
        createdAt: new Date(),
        createdBy: uid,
        line: lineName.toLowerCase()
    }

    delete newProduct.value

    const snap = await ref.add(newProduct)
    
    const algoliaObject = {
        ...newProduct,
        objectID: snap.id
    }

    delete algoliaObject.createdAt

    await algolia.addProduct(algoliaObject)

    return snap.id

}

export async function updateProduct(product, id){
    const snap = await firebase.firestore().collection(PRODUCTS).doc(id)
    const lineName = product.line.value || product.line
    const newProduct ={
        ...product,
        line: lineName.toLowerCase()
    }

    delete newProduct.value

    await snap.update(newProduct)
    await algolia.updateProduct(id, newProduct)
    return id
}

export async function addOrUpdateProduct(product, id){
    if(id){
        await updateProduct(product, id)
        return 'updated'
    }else{
        await addProduct(product)
        return 'created'
    }
}

export async function getAllProducts(){
    const snap = await firebase.firestore().collection(PRODUCTS).get()
    const data = {}
    snap.forEach(doc =>{
        data[doc.id] = {...doc.data(), id: doc.id}
    })
    return data
}

export async function getProductByReference(ref){
    const snap = await firebase.firestore().collection(PRODUCTS).where('reference','==', ref).get()
    const results = []
    snap.forEach(product =>{
        if(product.exists){
            results.push({...product.data(), id: product.id})
        }
    })
    if(results.length){
        return results
    }else{
        return null
    }
}


export async function deletProduct(id){
    const ref = firebase.firestore().collection(PRODUCTS).doc(id)
    await ref.delete()
    await algolia.deleteProduct(id)
    return
}


export async function getLastProducts(){
    const ref = firebase.firestore().collection(PRODUCTS).orderBy('createdAt', 'desc').limit(5)
    const res = await ref.get()
    const result = {}
    res.forEach(doc =>{
        result[doc.id] = { ...doc.data(), id: doc.id }
    })
    return result
}

//--------------------------------------------- Orders ---------------------------------------------------

export async function getSerialCode(){
    const ref = firebase.firestore().collection('codes').doc('serialCode')
    return await firebase.firestore().runTransaction((transaction)=>{
        return transaction.get(ref).then(snap =>{
            if(!snap.exists){
                return Promise.reject('No se encontro el codigo')
            }
            const serial = snap.data()
            const newSerial = incrementSerial(serial)
            transaction.update(ref, newSerial)
            return newSerial
        })
    })
} 


export async function addOrder(order){
    const dbOrders = firebase.firestore().collection(ORDERS)
    const dbClients = firebase.firestore().collection(CLIENTS)
    const oredrRef = dbOrders.doc()
    const orderId = oredrRef.id
   
    const serialCode = await getSerialCode()
    const serialCodeText = serialCode.letter + serialCode.number

    /* const orderResume = {
        serialCode: serialCodeText,
        total: order.total,
        subTotal: order.subTotal,
        descount: order.descount,
        currency: order.currency,
        balance: order.total
    } */

    const totalProducts = order.products.reduce((prev, current)=>{
        return prev + parseInt(current.quantity)
    }, 0)

    const orderObject = { 
        ...order,
        state: 'pending',
        totalProducts,
        balance: order.total,
        serialCode: serialCodeText,
        clientId: order.clientInfo.id,
        creator: firebase.auth().currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    delete orderObject.clientInfo
    delete orderObject.client

    const algoliaObject={
        objectID: orderId,
        serialCode: serialCodeText,
        clientName: order.clientInfo.name,
        clinetId: order.clientInfo.id,
        country: order.clientInfo.country.translations.es || order.clientInfo.country.name,
        city: order.clientInfo.city,
        creator: firebase.auth().currentUser.uid,
    }

    const db = firebase.firestore()
    await db.runTransaction((transaction)=>{
        return new Promise(async (res, rej)=>{
            const clientRef = dbClients.doc(order.clientInfo.id)
            //const clientOrderRef = clientRef.collection(ORDERS).doc(orderId)
            const snap = await transaction.get(clientRef)
            const client = snap.data()
            
            //transaction.set(clientOrderRef, orderResume)
            
            if(!snap.exists){
                rej('El cliente no existe')
                return
            }

            let totalOrders = 1
            if(client.totalOrders){
                totalOrders = client.totalOrders + 1
            }

            let totalValue = order.total
            if(client.currency !== order.currency){
                totalValue = await convertCurrency(order.currency, client.currency, totalValue)
            }

            if(!client.balance){
                transaction.update(clientRef,{balance: totalValue, totalOrders})
            }else{
                const totalBalance = client.balance + totalValue
                transaction.update(clientRef, {balance: totalBalance, totalOrders})
            }
            transaction.set(oredrRef, orderObject)
            res('completed')
            return 
        })
    })

    await algolia.addOrder(algoliaObject)
    return 
}

export async function getAllOrders(){
    const db = firebase.firestore().collection(ORDERS).orderBy('createdAt','desc').limit(30)
    const orders = {}
    const snap = await db.get()
    snap.forEach(order => {
        orders[order.id] = { ...order.data(), id: order.id }
    })
    return orders
}



//-------------------------------------------- Handle Error ----------------------------------------------

const handleError = (cb) => (err) =>{
    if(cb){
        cb(err)
    }else{
        console.log(err)
    }
}