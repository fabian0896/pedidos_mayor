import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { 
    formatPhone, 
    randomColor, 
    incrementSerial, 
    compareObjects, 
    isTheArrayEqual,
    thousandSeparator 
} from './utilities'
import * as algolia from './algoliaService'
import { convertCurrency } from './currencyService'




const CLIENTS = 'clients'
const CODES = 'codes'
const SELLERS = 'sellers'
const PRODUCTS = 'products'
const ORDERS = 'orders'
const PAYMENTS = 'payments'
const SHIPPING = 'shipping'


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


    const timeLineObject = {
        type: 'CREATED',
        author: firebase.auth().currentUser.uid,
        date: new Date(),
        title: 'Pedido Creado',
        message: 'Se añadio el pedido al sistema'
    }

    const totalProducts = order.products.reduce((prev, current)=>{
        return prev + parseInt(current.quantity)
    }, 0)

    const orderObject = { 
        ...order,
        timeLine:[timeLineObject],
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
            const lastOrder = new Date()
            if(!client.balance){
                transaction.update(clientRef,{
                    balance: totalValue, 
                    totalOrders, 
                    lastOrder, 
                    updatedAt: lastOrder
                })
            }else{
                const totalBalance = client.balance + totalValue
                transaction.update(clientRef, {
                    balance: totalBalance, 
                    totalOrders, 
                    lastOrder,
                    updatedAt: lastOrder
                })
            }
            transaction.set(oredrRef, orderObject)
            res('completed')
            return 
        })
    })

    await algolia.addOrder(algoliaObject)
    return 
}


export async function updateOrder(order, id){
    const dbOrders = firebase.firestore().collection(ORDERS)
    const dbClients = firebase.firestore().collection(CLIENTS)
    const oredrRef = dbOrders.doc(id)
  
    const totalProducts = order.products.reduce((prev, current)=>{
        return prev + parseInt(current.quantity)
    }, 0)

    const orderObject = { 
        ...order,
        state: 'pending',
        totalProducts,
        balance: order.total,
        clientId: order.clientInfo.id,
        updatedAt: new Date()
    }

    delete orderObject.clientInfo
    delete orderObject.client

    const algoliaObject={
        clientName: order.clientInfo.name,
        clinetId: order.clientInfo.id,
        country: order.clientInfo.country.translations.es || order.clientInfo.country.name,
        city: order.clientInfo.city,
    }

    const db = firebase.firestore()
    await db.runTransaction((transaction)=>{
        return new Promise(async (res, rej)=>{
            const clientRef = dbClients.doc(order.clientInfo.id)
            //const clientOrderRef = clientRef.collection(ORDERS).doc(orderId)
            const clientSnap = await transaction.get(clientRef)
            const orderSnap = await transaction.get(oredrRef)
            const client = clientSnap.data()
            const oldOrder = orderSnap.data()

            if(!clientSnap.exists || !orderSnap.exists){
                rej('El cliente y/o el pedido no existe')
                return
            }


            const timeLineObject = {
                type: 'UPDATED',
                author: firebase.auth().currentUser.uid,
                date: new Date(),
                title: 'Pedido Actualizado',
            }


            const equalShipping = compareObjects(order.shipping, oldOrder.shipping)
            const equalProducts = isTheArrayEqual(order.products, oldOrder.products, ['color','quantity','price','reference', 'size'])
            const equalDescount = order.descount === oldOrder.descount 
            const edittinfMessage = []
            const timeLine = [...oldOrder.timeLine]
           
            if(!equalProducts){
                edittinfMessage.push(`Se modificaron las prendas`)
            }
            if(!equalShipping){
                edittinfMessage.push('Se modificó la informacion de envio')
            }
            if(!equalDescount){
                edittinfMessage.push(`Se modificó el descuento aplicado ${oldOrder.descount}% > ${order.descount}%`)
            }
            if(!equalDescount || !equalProducts){
                edittinfMessage.push(`valor anterior:  $${thousandSeparator(oldOrder.total)}, nuevo valor: $${thousandSeparator(order.total)}, Nuevo Saldo: $${thousandSeparator(order.total - (order.totalPayments || 0))}`)
            }

            if(edittinfMessage.length){
                timeLineObject['message'] = edittinfMessage.join(', ')
                timeLine.push(timeLineObject)
            }   
            

            let totalValue = order.total
            if(client.currency !== order.currency){
                totalValue = await convertCurrency(order.currency, client.currency, totalValue)
            }


            if(order.payments && order.totalPayments){
                totalValue = totalValue - order.totalPayments
            }


            if(!client.balance){
                transaction.update(clientRef,{
                    balance: totalValue, 
                    updatedAt: new Date(),
                })
            }else{
                const totalBalance = (client.balance - oldOrder.balance) + totalValue
                transaction.update(clientRef, {
                    balance: totalBalance, 
                    updatedAt: new Date()
                })
            }
            transaction.update(oredrRef, {...orderObject, timeLine, balance: totalValue})
            res('completed')
            return 
        })
    })

    await algolia.updateOrder(id, algoliaObject)
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

export async function getOrderbyId(id){
    const db = firebase.firestore().collection(ORDERS).doc(id)
    const snap = await db.get()
    if(!snap.exists){
        return Promise.reject('El Pedido no existe')
    }
    return {...snap.data(), id: snap.id}
}


export async function getOrderByClient(clientId){
    const db = firebase.firestore().collection(ORDERS).where('clientId','==',clientId).orderBy('createdAt', 'desc').limit(30)
    const orders = {}
    const snap = await db.get()
    snap.forEach(order =>{
        orders[order.id] = {...order.data(), id: order.id}
    })
    return orders
}


export async function getOrdersWithBalance(){
    const db = firebase.firestore().collection(ORDERS).where('balance','>', 0)
    const snap = await db.get()
    const result = {}
    snap.forEach(order=>{
        if(order.exists){
            result[order.id] = {...order.data(), id: order.id}
        }
    })
    return result
}


//----------------------------------------------Payments------------------------------------------


export async function addPayment(payment){
    const db = firebase.firestore()
    const paymentref = db.collection(PAYMENTS).doc()
    const paymentId = paymentref.id
    const oredrRef = db.collection(ORDERS).doc(payment.order.value)
    let algoliaObject = {}
    await db.runTransaction(async (transaction)=>{
            const orderSnap = await transaction.get(oredrRef)
            const order = orderSnap.data()
            const clientId =  order.clientId
            const clientRef = db.collection(CLIENTS).doc(clientId)
            const clientSnap = await transaction.get(clientRef)
            const client = clientSnap.data()

            const newBalance = client.balance - payment.value

            const paymentObject = {
                id: paymentId,
                value: payment.value,
                paymentMethod: payment.paymentMethod,
                reference: payment.reference,
                orderId: payment.order.value,
                orderSerialCode: order.serialCode,
                clientId,
                clientName: client.name,
                clientColor: client.personalColor,
                currency: client.currency,
                totalOrder: order.total,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            algoliaObject = {
                objectID: paymentId,
                reference: paymentObject.reference,
                method: paymentObject.paymentMethod,
                clientName: client.name,
                clientId,
                orderId: payment.order.value,
                serialCode: order.serialCode
            }

            const timeLine = order.timeLine

            let totalPayments = parseFloat(payment.value)

            const newOrderBalance = parseFloat(order.balance) - parseFloat(payment.value)
            
            if(order.payments){
                const subTotal = Object.keys(order.payments)
                                        .map(id=>order.payments[id])
                                        .reduce((previus, current)=>{
                                            return previus + parseFloat(current.value)
                                        }, 0)
                totalPayments += subTotal
            }

            timeLine.push({
                type: 'PAYMENT',
                author: firebase.auth().currentUser.uid,
                date: new Date(),
                title: 'Pago Realizado',
                message: `Se realizó un pago por ${client.currency} $${thousandSeparator(payment.value)}, Saldo: ${client.currency} $${thousandSeparator(newOrderBalance)}`
            })

            if(newOrderBalance <= 0){
                    timeLine[timeLine.length-1].message = `Se realizo un pago por $${thousandSeparator(payment.value)} para completar el pago total del pedido (${client.currency} $${thousandSeparator(order.total)})`
            }

            paymentObject['orderBalance'] = newOrderBalance

            const orderObject = {
                [`payments.${paymentId}`]: paymentObject,
                timeLine,
                totalPayments,
                balance: newOrderBalance,
                updatedAt: new Date()
            }

            const clientObject = {
                balance: newBalance,
                updatedAt: new Date(),
                lastPayment: new Date()
            }

            transaction.update(clientRef, clientObject)
            transaction.update(oredrRef, orderObject)
            transaction.set(paymentref, paymentObject)

            return
    })

    await algolia.addPayment(algoliaObject)

    return
}

export async function getPayments(id){
    const db = firebase.firestore().collection(PAYMENTS)
    if(id){
        const snap = await db.where('clientId','==',id).orderBy('createdAt','desc').limit(20).get()
        const results = []
        snap.forEach(item=>{
            results.push({...item.data(), id: item.id})
        })
        return results
    }
    const allSnap = await db.orderBy('createdAt','desc').limit(30).get()
    const allResults = []
    allSnap.forEach(item=>{
        allResults.push({...item.data(), id: item.id})
    })
    return allResults
}

export async function getPaymentsByOrderId(orderId){
    const db = firebase.firestore().collection(PAYMENTS).where('orderId','==',orderId).orderBy('createdAt','desc').limit(10)
    const snap = await db.get()
    const results = []
    snap.forEach(item=>{
        results.push({...item.data(), id: item.id})
    })
    return results
}

export async function getPaymentById(id){
    const snap = await firebase.firestore().collection(PAYMENTS).doc(id).get()
    return {...snap.data(), id: snap.id}
}

export async function getPendingOrders(){
    const snap = await firebase.firestore().collection(ORDERS).where('state','==', 'pending').orderBy('serialCode','asc').get()
    const results = []
    snap.forEach(item=>{
        results.push({...item.data(), id: item.id})
    })
    return results
}

//-------------------------------------------- Shippinhg -------------------------------------------------

export async function AddShipping(shipping){
    const db =  firebase.firestore()
    const shippingRef = db.collection(SHIPPING).doc()
    const orderRef = db.collection(ORDERS).doc(shipping.order.id)
    const shippingId = shippingRef.id

    const shippingObject = {
        id: shippingId,
        clientId: shipping.order.clientId,
        trackingNumber: shipping.trackingNumber,
        shippingUnits: shipping.shippingUnits,
        shippingDestination: shipping.shipping,
        price: shipping.price,
        currency: shipping.currency,
        order: shipping.order,
        orderId: shipping.order.id,
        company: shipping.company,
        paymentMethod: shipping.paymentMethod,
        updatedAt: new Date(),
        createdAt: new Date()
    }

    await db.runTransaction(async transaction => {
        const orderSnap = await transaction.get(orderRef)
        const order = orderSnap.data()


        const timeLine = order.timeLine
        


        let shippingPrice = parseFloat(shipping.price)
        if(shipping.currency !== order.currency){
            shippingPrice = await convertCurrency(shipping.currency, order.currency, shippingPrice)
        }
        shippingObject.price = shippingPrice

        let orderBalance =  order.balance
        if(shipping.paymentMethod === 'payHere'){
            orderBalance += shippingPrice
        }

        const orderShipments = order.shipments || []

        orderShipments.push(shippingObject)

        const shipmentsPrice = orderShipments.reduce((previus, current)=>{
            const price = current.paymentMethod === 'payHere'? current.price : 0
            return previus + price
        }, 0)

        const totalProducts = shipping.shippingUnits.reduce((prev, current)=>{
            return prev + current.quantity
        }, 0)

        const totalWeight = shipping.shippingUnits.reduce((prev, current)=>{
            return prev + current.weight
        }, 0)

        shippingObject.totalProducts =  totalProducts
        shippingObject.totalWeight = totalWeight

        const shippedProducts = (order.shippedProducts || 0) + totalProducts
        
        const timeLineObject = {
            type: 'SHIPPING',
            author: firebase.auth().currentUser.uid,
            date: new Date(),
            title: 'Envio Realizado',
            message: `Se despacharon ${totalProducts} prendas, por medio de ${shipping.company}, `
        }

        if(shipping.trackingNumber){
            timeLineObject.message += `con numero de guia ${shipping.trackingNumber}`
        }else{
            timeLineObject.message += `guia pendiente por añadir`
        }

        timeLine.push(timeLineObject)


        const orderObject = {
            balance:  orderBalance,
            shipments: orderShipments,
            shipmentsPrice,
            shippedProducts,
            timeLine,
            updatedAt: new Date()
        }





        transaction.set(shippingRef, shippingObject)
        transaction.update(orderRef, orderObject )

        return
    })
    return 'ADDED'
}


export async function getAllShipments(){
    const db = firebase.firestore().collection(SHIPPING).orderBy('createdAt', 'desc').limit(30)
    const snap = await db.get()
    let results = []
    snap.forEach(item=>{
        results.push({...item.data(), id: item.id})
    })
    return results
}

export async function getAllShipmentsByClientId(clientId){
    const db = firebase.firestore().collection(SHIPPING).where('clientId', '==', clientId).orderBy('createdAt', 'desc').limit(15)
    const snap = await db.get()
    let results = []
    snap.forEach(item=>{
        results.push({...item.data(), id: item.id})
    })
    return results
}   

//-------------------------------------------- Handle Error ----------------------------------------------

const handleError = (cb) => (err) =>{
    if(cb){
        cb(err)
    }else{
        console.log(err)
    }
}