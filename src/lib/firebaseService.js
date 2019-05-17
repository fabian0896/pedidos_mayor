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
const NOTIFICATIONS = 'notifications'

//---------------------------------------------CLients -------------------------------------------


export function createCliente(client) {

    const databaseRef = firebase.firestore().collection(CLIENTS);

    const phone = formatPhone(client.phone, client.country.callingCodes[0])
    const personalColor = randomColor(200, 40)
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

    
    return new Promise(async (res, rej) => {
        const seenArray =  await getSeenArray()
        const notificationObject = {
            type: 'CREATED',
            collection: CLIENTS,
            author: firebase.auth().currentUser.uid,
            message: `El clinete ${client.name} de ${country} acaba de ser agregado`,
            link: `clientes/`,
            date: new Date(),
            seen: seenArray
        }
    
        const myHandleError = handleError(rej)
        const documentSnapshot = await databaseRef.add(newClient).catch(myHandleError)
        algoliaObject['objectID'] = documentSnapshot.id
        notificationObject['link'] += documentSnapshot.id
        await firebase.firestore().collection(NOTIFICATIONS).add(notificationObject)
        await algolia.addClient(algoliaObject).catch(myHandleError)
        res('created')
        return
    })
}





export function updateClient(id, client) {
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


    
    return new Promise(async (res, rej) => {
        const seenArray =  await getSeenArray()
        const notificationObject = {
            type: 'UPDATED',
            collection: CLIENTS,
            author: firebase.auth().currentUser.uid,
            message: `El clinete ${client.name} de ${country} acaba de ser actualizado`,
            link: `clientes/${id}`,
            date: new Date(),
            seen: seenArray
        }
        const myHandleError = handleError(rej)
        //const documentSnapshot = await databaseRef.doc(id).get().catch(myHandleError)
        await databaseRef.doc(id).update(newClient).catch(myHandleError)
        await firebase.firestore().collection(NOTIFICATIONS).add(notificationObject)
        await algolia.updateClient(id, algoliaObject).catch(myHandleError)
        res('updated')
        return
    })
}


export async function deleteClient(id) {
    const databaseRef = firebase.firestore().collection(CLIENTS)
    const clientSnap = await databaseRef.doc(id).get()
    const client = clientSnap.data()
    const country = client.country.translations.es || client.country.name

    const seenArray =  await getSeenArray()

    const notificationObject = {
        type: 'UPDATED',
        collection: CLIENTS,
        author: firebase.auth().currentUser.uid,
        message: `El clinete ${client.name} de ${country} acaba de ser eliminadó del sistema`,
        link: `clientes`,
        date: new Date(),
        seen: seenArray
    }

    await addNotification(notificationObject)
    await databaseRef.doc(id).delete()
    await algolia.deleteUser(id)

    return 'DELETED'
}


export function createUpdateClient(client, id) {
    return new Promise(async (res, rej) => {
        const myHandleError = handleError(rej)
        if (id) {
            const updateRes = await updateClient(id, client).catch(myHandleError)
            res(updateRes)
            return
        } else {
            const createRes = await createCliente(client).catch(myHandleError)
            res(createRes)
            return
        }
    })
}




export function getAllClients(cb) {
    firebase.firestore().collection(CLIENTS).orderBy('name', 'asc')
        .onSnapshot(querySnapshot => {
            const clientsList = {}
            querySnapshot.forEach(doc => {
                clientsList[doc.id] = { id: doc.id, ...doc.data() }
            })
            cb(null, clientsList)
        })
}


export async function getClientById(id, callback) {
    const snap = await firebase.firestore().collection(CLIENTS).doc(id).get().catch(err => { throw Error(err) })
    if (snap.exists) {
        return { id: snap.id, ...snap.data() }
    } else {
        return null
    }
}

export async function getLastClients() {
    const snap = await firebase.firestore().collection(CLIENTS).orderBy('createdAt', 'desc').limit(5).get()
    const res = {}
    snap.forEach(doc => {
        res[doc.id] = { ...doc.data(), id: doc.id }
    })
    return res
}

//------------------------------------------ SELLERS-------------------------------------------------------


export async function getAllSellers(array=false) {
    const snap = await firebase.firestore().collection(SELLERS).get()
    const sellers = {}
    const sellersArray = []
    snap.forEach(seller => {
        sellers[seller.id] = {...seller.data(), id: seller.id}
        sellersArray.push({...seller.data(), id: seller.id})
    })
    if(array){
        return sellersArray
    }
    return sellers;
}


export async function getSellerById(id) {
    const seller = await firebase.firestore().collection(SELLERS).doc(id).get()
    if (seller.exists) {
        return seller.data()
    }
    return null
}

export async function registerUSer(email, password) {
    const snap = await firebase.auth().createUserWithEmailAndPassword(email, password)
    return snap.user.uid
}


export function createSeller({ email, password, code, name }) {
    return new Promise(async (res, rej) => {
        const codes = await getCodes()
        const matchCode = codes.find(actualCode => actualCode.value === code)
        if (!matchCode) {
            rej("El codigo de registro es invalido")
            return
        }
        const uid = await registerUSer(email, password).catch(() => {
            rej("no se pudo crear el usuario con el correo espesificado")
            return
        })
        if (uid) {
            await firebase.firestore().collection(SELLERS).doc(uid).set({
                name,
                email,
            })
            res("se creo el usuario correctamente")
        }
        return
    })
}


export function getCodes() {
    return new Promise(async (res, rej) => {
        const myHandleError = handleError(rej)
        const snap = await firebase.firestore().collection(CODES).doc('registerCode').get().catch(myHandleError)
        return [snap.data()]
    })
}

//---------------------------------------------Products ---------------------------------------------

export async function addProduct(product) {
    const ref = firebase.firestore().collection(PRODUCTS)
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

export async function updateProduct(product, id) {
    const snap = await firebase.firestore().collection(PRODUCTS).doc(id)
    const lineName = product.line.value || product.line
    const newProduct = {
        ...product,
        line: lineName.toLowerCase()
    }

    delete newProduct.value

    await snap.update(newProduct)
    await algolia.updateProduct(id, newProduct)
    return id
}

export async function addOrUpdateProduct(product, id) {
    if (id) {
        await updateProduct(product, id)
        return 'updated'
    } else {
        await addProduct(product)
        return 'created'
    }
}

export async function getAllProducts() {
    const snap = await firebase.firestore().collection(PRODUCTS).get()
    const data = {}
    snap.forEach(doc => {
        data[doc.id] = { ...doc.data(), id: doc.id }
    })
    return data
}

export async function getProductByReference(ref) {
    const snap = await firebase.firestore().collection(PRODUCTS).where('reference', '==', ref).get()
    const results = []
    snap.forEach(product => {
        if (product.exists) {
            results.push({ ...product.data(), id: product.id })
        }
    })
    if (results.length) {
        return results
    } else {
        return null
    }
}


export async function deletProduct(id) {
    const ref = firebase.firestore().collection(PRODUCTS).doc(id)
    await ref.delete()
    await algolia.deleteProduct(id)
    return
}


export async function getLastProducts() {
    const ref = firebase.firestore().collection(PRODUCTS).orderBy('createdAt', 'desc').limit(5)
    const res = await ref.get()
    const result = {}
    res.forEach(doc => {
        result[doc.id] = { ...doc.data(), id: doc.id }
    })
    return result
}

//--------------------------------------------- Orders ---------------------------------------------------

export async function getSerialCode() {
    const ref = firebase.firestore().collection('codes').doc('serialCode')
    return await firebase.firestore().runTransaction((transaction) => {
        return transaction.get(ref).then(snap => {
            if (!snap.exists) {
                return Promise.reject('No se encontro el codigo')
            }
            const serial = snap.data()
            const newSerial = incrementSerial(serial)
            transaction.update(ref, newSerial)
            return newSerial
        })
    })
}


export async function addOrder(order) {
    const dbOrders = firebase.firestore().collection(ORDERS)
    const dbClients = firebase.firestore().collection(CLIENTS)
    const oredrRef = dbOrders.doc()
    const orderId = oredrRef.id

    const serialCode = await getSerialCode()
    const serialCodeText = serialCode.letter + serialCode.number


    
    const seenArray =  await getSeenArray()

    const timeLineObject = {
        type: 'CREATED',
        author: firebase.auth().currentUser.uid,
        date: new Date(),
        title: 'Pedido Creado',
        message: 'Se añadio el pedido al sistema'
    }

    const totalProducts = order.products.reduce((prev, current) => {
        return prev + parseInt(current.quantity)
    }, 0)

    const orderObject = {
        ...order,
        timeLine: [timeLineObject],
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

    const algoliaObject = {
        objectID: orderId,
        serialCode: serialCodeText,
        clientName: order.clientInfo.name,
        clinetId: order.clientInfo.id,
        country: order.clientInfo.country.translations.es || order.clientInfo.country.name,
        city: order.clientInfo.city,
        creator: firebase.auth().currentUser.uid,
    }
    

    const db = firebase.firestore()
    await db.runTransaction((transaction) => {
        return new Promise(async (res, rej) => {
            const clientRef = dbClients.doc(order.clientInfo.id)
            //const clientOrderRef = clientRef.collection(ORDERS).doc(orderId)
            const snap = await transaction.get(clientRef)
            const client = snap.data()

            //transaction.set(clientOrderRef, orderResume)

            if (!snap.exists) {
                rej('El cliente no existe')
                return
            }

            let totalOrders = 1
            if (client.totalOrders) {
                totalOrders = client.totalOrders + 1
            }

            let totalValue = order.total
            if (client.currency !== order.currency) {
                totalValue = await convertCurrency(order.currency, client.currency, totalValue)
            }
            const lastOrder = new Date()
            if (!client.balance) {
                transaction.update(clientRef, {
                    balance: totalValue,
                    totalOrders,
                    lastOrder,
                    updatedAt: lastOrder
                })
            } else {
                const totalBalance = client.balance + totalValue
                transaction.update(clientRef, {
                    balance: totalBalance,
                    totalOrders,
                    lastOrder,
                    updatedAt: lastOrder
                })
            }


            const notificationObject = {
                type: 'CREATED',
                collection: ORDERS,
                author: firebase.auth().currentUser.uid,
                message: `Se añadio el pedido ${serialCode} a nombre de  ${client.name} (${totalProducts} prendas)`,
                link: `pedidos/${orderId}`,
                date: new Date(),
                seen: seenArray
            }

            transaction.set(firebase.firestore().collection(NOTIFICATIONS).doc(), notificationObject)
            transaction.set(oredrRef, orderObject)
            res('completed')
            return
        })
    })

    await algolia.addOrder(algoliaObject)
    return
}


export async function updateOrder(order, id) {
    const dbOrders = firebase.firestore().collection(ORDERS)
    const dbClients = firebase.firestore().collection(CLIENTS)
    const oredrRef = dbOrders.doc(id)

    const seenArray =  await getSeenArray()

    const totalProducts = order.products.reduce((prev, current) => {
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

    const algoliaObject = {
        clientName: order.clientInfo.name,
        clinetId: order.clientInfo.id,
        country: order.clientInfo.country.translations.es || order.clientInfo.country.name,
        city: order.clientInfo.city,
    }

    const db = firebase.firestore()
    await db.runTransaction((transaction) => {
        return new Promise(async (res, rej) => {
            const clientRef = dbClients.doc(order.clientInfo.id)
            //const clientOrderRef = clientRef.collection(ORDERS).doc(orderId)
            const clientSnap = await transaction.get(clientRef)
            const orderSnap = await transaction.get(oredrRef)
            const client = clientSnap.data()
            const oldOrder = orderSnap.data()

            if (!clientSnap.exists || !orderSnap.exists) {
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
            const equalProducts = isTheArrayEqual(order.products, oldOrder.products, ['color', 'quantity', 'price', 'reference', 'size', 'mold', 'label'])
            const equalDescount = order.descount === oldOrder.descount
            const edittinfMessage = []
            const timeLine = [...oldOrder.timeLine]

            if (!equalProducts) {
                edittinfMessage.push(`Se modificaron las prendas`)
            }
            if (!equalShipping) {
                edittinfMessage.push('Se modificó la informacion de envio')
            }
            if (!equalDescount) {
                edittinfMessage.push(`Se modificó el descuento aplicado ${oldOrder.descount}% > ${order.descount}%`)
            }
            if (!equalDescount || !equalProducts) {
                edittinfMessage.push(`valor anterior:  $${thousandSeparator(oldOrder.total)}, nuevo valor: $${thousandSeparator(order.total)}, Nuevo Saldo: $${thousandSeparator(order.total - (order.totalPayments || 0))}`)
            }

            if (edittinfMessage.length) {
                timeLineObject['message'] = edittinfMessage.join(', ')
                timeLine.push(timeLineObject)
            }


            let totalValue = order.total
            if (client.currency !== order.currency) {
                totalValue = await convertCurrency(order.currency, client.currency, totalValue)
            }


            if (order.payments && order.totalPayments) {
                totalValue = totalValue - order.totalPayments
            }


            if (!client.balance) {
                transaction.update(clientRef, {
                    balance: totalValue,
                    updatedAt: new Date(),
                })
            } else {
                const totalBalance = (client.balance - oldOrder.balance) + totalValue
                transaction.update(clientRef, {
                    balance: totalBalance,
                    updatedAt: new Date()
                })
            }


            const notificationObject = {
                type: 'UPDATED',
                collection: ORDERS,
                author: firebase.auth().currentUser.uid,
                message: `Se edito el pedido ${oldOrder.serialCode} a nombre de  ${client.name} (${totalProducts} prendas)`,
                link: `pedidos/${id}`,
                date: new Date(),
                seen: seenArray
            }

            transaction.set(firebase.firestore().collection(NOTIFICATIONS).doc(), notificationObject)
            transaction.update(oredrRef, { ...orderObject, timeLine, balance: totalValue })
            res('completed')
            return
        })
    })

    await algolia.updateOrder(id, algoliaObject)
    return
}



export async function getAllOrders() {
    const db = firebase.firestore().collection(ORDERS).orderBy('createdAt', 'desc').limit(30)
    const orders = {}
    const snap = await db.get()
    snap.forEach(order => {
        orders[order.id] = { ...order.data(), id: order.id }
    })
    return orders
}

export async function getOrderbyId(id) {
    const db = firebase.firestore().collection(ORDERS).doc(id)
    const snap = await db.get()
    if (!snap.exists) {
        return Promise.reject('El Pedido no existe')
    }
    return { ...snap.data(), id: snap.id }
}


export async function getOrderByClient(clientId) {
    const db = firebase.firestore().collection(ORDERS).where('clientId', '==', clientId).orderBy('createdAt', 'desc').limit(30)
    const orders = {}
    const snap = await db.get()
    snap.forEach(order => {
        orders[order.id] = { ...order.data(), id: order.id }
    })
    return orders
}


export async function getOrdersWithBalance() {
    const db = firebase.firestore().collection(ORDERS).where('balance', '>', 0)
    const snap = await db.get()
    const result = {}
    snap.forEach(order => {
        if (order.exists) {
            result[order.id] = { ...order.data(), id: order.id }
        }
    })
    return result
}


//----------------------------------------------Payments------------------------------------------


export async function addPayment(payment) {
    const db = firebase.firestore()
    const paymentref = db.collection(PAYMENTS).doc()
    const paymentId = paymentref.id
    const oredrRef = db.collection(ORDERS).doc(payment.order.value)

    const seenArray =  await getSeenArray()

    let algoliaObject = {}
    await db.runTransaction(async (transaction) => {
        const orderSnap = await transaction.get(oredrRef)
        const order = orderSnap.data()
        const clientId = order.clientId
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

        if (order.payments) {
            const subTotal = Object.keys(order.payments)
                .map(id => order.payments[id])
                .reduce((previus, current) => {
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

        if (newOrderBalance <= 0) {
            timeLine[timeLine.length - 1].message = `Se realizo un pago por $${thousandSeparator(payment.value)} para completar el pago total del pedido (${client.currency} $${thousandSeparator(order.total)})`
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

        const notificationObject = {
            type: 'CREATED',
            collection: PAYMENTS,
            author: firebase.auth().currentUser.uid,
            message: `Se agrego pago a el pedido ${order.serialCode} a nombre de  ${client.name} por ${payment.currency} $${thousandSeparator(payment.value)}`,
            link: `pedidos/${payment.order.value}`,
            date: new Date(),
            seen: seenArray
        }


        transaction.set(firebase.firestore().collection(NOTIFICATIONS).doc(), notificationObject)
        transaction.update(clientRef, clientObject)
        transaction.update(oredrRef, orderObject)
        transaction.set(paymentref, paymentObject)

        return
    })

    await algolia.addPayment(algoliaObject)

    return
}

export async function getPayments(id) {
    const db = firebase.firestore().collection(PAYMENTS)
    if (id) {
        const snap = await db.where('clientId', '==', id).orderBy('createdAt', 'desc').limit(20).get()
        const results = []
        snap.forEach(item => {
            results.push({ ...item.data(), id: item.id })
        })
        return results
    }
    const allSnap = await db.orderBy('createdAt', 'desc').limit(30).get()
    const allResults = []
    allSnap.forEach(item => {
        allResults.push({ ...item.data(), id: item.id })
    })
    return allResults
}

export async function getPaymentsByOrderId(orderId) {
    const db = firebase.firestore().collection(PAYMENTS).where('orderId', '==', orderId).orderBy('createdAt', 'desc').limit(10)
    const snap = await db.get()
    const results = []
    snap.forEach(item => {
        results.push({ ...item.data(), id: item.id })
    })
    return results
}

export async function getPaymentById(id) {
    const snap = await firebase.firestore().collection(PAYMENTS).doc(id).get()
    return { ...snap.data(), id: snap.id }
}

export async function getPendingOrders() {
    const snap = await firebase.firestore().collection(ORDERS).where('state', '==', 'pending').orderBy('serialCode', 'asc').get()
    const results = []
    snap.forEach(item => {
        results.push({ ...item.data(), id: item.id })
    })
    return results
}

//-------------------------------------------- Shippinhg -------------------------------------------------

export async function AddShipping(shipping) {
    const db = firebase.firestore()
    const shippingRef = db.collection(SHIPPING).doc()
    const orderRef = db.collection(ORDERS).doc(shipping.order.id)
    const clientRef = db.collection(CLIENTS).doc(shipping.order.clientId)
    const shippingId = shippingRef.id


    const seenArray =  await getSeenArray()

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

    const algoliaObject = {
        objectID: shippingId,
        clientId: shippingObject.clientId,
        trackingNumber: shippingObject.trackingNumber,
        orderSerialCode: shippingObject.order.label,
        company: shippingObject.company,
        paymentMethod: shippingObject.paymentMethod,
        clientName: shippingObject.order.secondary
    }

    await db.runTransaction(async transaction => {
        const orderSnap = await transaction.get(orderRef)
        const clientSnap = await transaction.get(clientRef)
        const client = clientSnap.data()
        const order = orderSnap.data()


        const timeLine = order.timeLine



        let shippingPrice = parseFloat(shipping.price)
        if (shipping.currency !== order.currency) {
            shippingPrice = await convertCurrency(shipping.currency, order.currency, shippingPrice)
        }
        shippingObject.price = shippingPrice

        let orderBalance = order.balance
        if (shipping.paymentMethod === 'payHere') {
            orderBalance += shippingPrice
        }

        const orderShipments = order.shipments || []

        orderShipments.push(shippingObject)

        const shipmentsPrice = orderShipments.reduce((previus, current) => {
            const price = current.paymentMethod === 'payHere' ? current.price : 0
            return previus + price
        }, 0)

        const totalProducts = shipping.shippingUnits.reduce((prev, current) => {
            return prev + current.quantity
        }, 0)

        const totalWeight = shipping.shippingUnits.reduce((prev, current) => {
            return prev + current.weight
        }, 0)

        shippingObject.totalProducts = totalProducts
        shippingObject.totalWeight = totalWeight

        const shippedProducts = (order.shippedProducts || 0) + totalProducts

        const timeLineObject = {
            type: 'SHIPPING',
            author: firebase.auth().currentUser.uid,
            date: new Date(),
            title: 'Envio Realizado',
            message: `Se despacharon ${totalProducts} prendas por medio de ${shipping.company}, `
        }

        if (shipping.trackingNumber) {
            timeLineObject.message += `con numero de guia ${shipping.trackingNumber}`
        } else {
            timeLineObject.message += `guia pendiente por añadir`
        }

        timeLine.push(timeLineObject)


        const orderObject = {
            balance: orderBalance,
            shipments: orderShipments,
            shipmentsPrice,
            shippedProducts,
            timeLine,
            updatedAt: new Date()
        }

        let clientBalance = client.balance

        if (shipping.paymentMethod === 'payHere') {
            clientBalance += shippingObject.price
        }


        const notificationObject = {
            type: 'CREATED',
            collection: SHIPPING,
            author: firebase.auth().currentUser.uid,
            message: `Se agrego envio a el pedido ${order.serialCode} a nombre de ${client.name}. (${totalProducts}) prendas despachadas`,
            link: `pedidos/${shipping.order.id}`,
            date: new Date(),
            seen: seenArray
        }

        transaction.set(firebase.firestore().collection(NOTIFICATIONS).doc(), notificationObject)
        transaction.update(clientRef, { balance: clientBalance })
        transaction.set(shippingRef, shippingObject)
        transaction.update(orderRef, orderObject)

        return
    })
    await algolia.addshipping(algoliaObject)
    return 'ADDED'
}


export async function getAllShipments() {
    const db = firebase.firestore().collection(SHIPPING).orderBy('createdAt', 'desc').limit(30)
    const snap = await db.get()
    let results = []
    snap.forEach(item => {
        results.push({ ...item.data(), id: item.id })
    })
    return results
}

export async function getAllShipmentsByClientId(clientId) {
    const db = firebase.firestore().collection(SHIPPING).where('clientId', '==', clientId).orderBy('createdAt', 'desc').limit(15)
    const snap = await db.get()
    let results = []
    snap.forEach(item => {
        results.push({ ...item.data(), id: item.id })
    })
    return results
}


export async function updatetrackingNumber(id, trackingNumber) {
    const shippingRef = firebase.firestore().collection(SHIPPING).doc(id)
    const db = firebase.firestore()

    const algoliaObject = {
        objectID: id,
        trackingNumber
    }

    await db.runTransaction(async transaction => {
        const shippingSnap = await transaction.get(shippingRef)
        const shipping = shippingSnap.data()
        const orderRef = firebase.firestore().collection(ORDERS).doc(shipping.orderId)
        const orderSnap = await transaction.get(orderRef)
        const order = orderSnap.data()

        const timeLine = order.timeLine
        const orderShipments = order.shipments

        const timeLineObject = {
            type: 'SHIPPING',
            author: firebase.auth().currentUser.uid,
            date: new Date(),
            title: 'Se agrego numero de guia pendiente ',
            message: `se agrego el numero de guia ${trackingNumber} al envio realizado por ${shipping.company}`
        }

        timeLine.push(timeLineObject)

        const indexEdit = orderShipments.findIndex(item => item.id === shipping.id)
        orderShipments[indexEdit] = { ...orderShipments[indexEdit], trackingNumber }

        transaction.update(shippingRef, { trackingNumber })
        transaction.update(orderRef, { timeLine, shipments: orderShipments })

        return
    })
    await algolia.updateshipping(id, algoliaObject)
    return 'UPDATED'
}



export async function updateShipping(id, shipping) {
    const db = firebase.firestore()
    const shippingRef = db.collection(SHIPPING).doc(id)
    const orderRef = db.collection(ORDERS).doc(shipping.order.id)
    const clientRef = db.collection(CLIENTS).doc(shipping.order.clientId)
    const shippingId = shippingRef.id

    const seenArray =  await getSeenArray()

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
    }


    const algoliaObject = {
        objectID: shippingId,
        clientId: shippingObject.clientId,
        trackingNumber: shippingObject.trackingNumber,
        orderSerialCode: shippingObject.order.label,
        company: shippingObject.company,
        paymentMethod: shippingObject.paymentMethod,
        clientName: shippingObject.order.secondary
    }


    await db.runTransaction(async transaction => {
        const orderSnap = await transaction.get(orderRef)
        const clientSnap = await transaction.get(clientRef)
        const shippingSnap = await transaction.get(shippingRef)
        const client = clientSnap.data()
        const order = orderSnap.data()
        const oldShipping = shippingSnap.data()

        const timeLine = order.timeLine

        let shippingPrice = parseFloat(shipping.price)
        if (shipping.currency !== order.currency) {
            shippingPrice = await convertCurrency(shipping.currency, order.currency, shippingPrice)
        }
        shippingObject.price = shippingPrice

        let clientBalance = client.balance
        let orderBalance = order.balance
        if (oldShipping.paymentMethod === 'payHere' && shipping.paymentMethod === 'payHere') {
            orderBalance = (orderBalance - oldShipping.price) + shippingPrice
            clientBalance = (clientBalance - oldShipping.price) + shippingPrice
        } else if (oldShipping.paymentMethod === 'payThere' && shipping.paymentMethod === 'payHere') {
            orderBalance += shippingPrice
            clientBalance += shippingPrice
        } else if (oldShipping.paymentMethod === 'payHere' && shipping.paymentMethod === 'payThere') {
            orderBalance = orderBalance - oldShipping.price
            clientBalance = clientBalance - oldShipping.price
        }

        const orderShipments = order.shipments
        const indexEdit = orderShipments.findIndex(item => item.id === shipping.id)


        const shipmentsPrice = orderShipments.reduce((previus, current) => {
            const price = current.paymentMethod === 'payHere' ? current.price : 0
            return previus + price
        }, 0)

        const totalProducts = shipping.shippingUnits.reduce((prev, current) => {
            return prev + current.quantity
        }, 0)

        const totalWeight = shipping.shippingUnits.reduce((prev, current) => {
            return prev + current.weight
        }, 0)

        shippingObject.totalProducts = totalProducts
        shippingObject.totalWeight = totalWeight

        orderShipments[indexEdit] = { ...shippingObject, createdAt: oldShipping.createdAt }

        const shippedProducts = (order.shippedProducts - oldShipping.totalProducts) + totalProducts

        const timeLineObject = {
            type: 'SHIPPING',
            author: firebase.auth().currentUser.uid,
            date: new Date(),
            title: 'Se editó el envio',
            message: `Se editó el envio realizado por medio de ${shipping.company}, `
        }

        if (shipping.trackingNumber) {
            timeLineObject.message += `con numero de guia ${shipping.trackingNumber}`
        } else {
            timeLineObject.message += `guia pendiente por añadir`
        }

        timeLine.push(timeLineObject)


        const orderObject = {
            balance: orderBalance,
            shipments: orderShipments,
            shipmentsPrice,
            shippedProducts,
            timeLine,
            updatedAt: new Date()
        }


        const notificationObject = {
            type: 'UPDATED',
            collection: SHIPPING,
            author: firebase.auth().currentUser.uid,
            message: `Se edito envio en el pedido ${order.serialCode} a nombre de ${client.name}. (${totalProducts}) prendas despachadas`,
            link: `pedidos/${shipping.order.id}`,
            date: new Date(),
            seen: seenArray
        }

        transaction.set(firebase.firestore().collection(NOTIFICATIONS).doc(), notificationObject)
        transaction.update(clientRef, { balance: clientBalance })
        transaction.update(shippingRef, shippingObject)
        transaction.update(orderRef, orderObject)

        return
    })
    await algolia.updateshipping(id, algoliaObject)
    return 'UPDATED'
}


export async function deleteShipping(id) {
    const db = firebase.firestore()
    const shippingRef = db.collection(SHIPPING).doc(id)

    const seenArray =  await getSeenArray()

    await db.runTransaction(async transaction => {
        const shippingSnap = await transaction.get(shippingRef)
        const oldShipping = shippingSnap.data()

        const orderRef = db.collection(ORDERS).doc(oldShipping.orderId)
        const clientRef = db.collection(CLIENTS).doc(oldShipping.clientId)


        const orderSnap = await transaction.get(orderRef)
        const clientSnap = await transaction.get(clientRef)
        const client = clientSnap.data()
        const order = orderSnap.data()

        const timeLine = order.timeLine

        // restar el valor de la orden al pedido y al client balance
        //solo si el pedido era payHere
        let clientBalance = client.balance
        let orderBalance = order.balance
        if (oldShipping.paymentMethod === 'payHere') {
            orderBalance = orderBalance - oldShipping.price
            clientBalance = clientBalance - oldShipping.price
        }


        const orderShipments = order.shipments
        const indexEdit = orderShipments.findIndex(item => item.id === oldShipping.id)
        orderShipments.splice(indexEdit, 1)


        const shipmentsPrice = orderShipments.reduce((previus, current) => {
            const price = current.paymentMethod === 'payHere' ? current.price : 0
            return previus + price
        }, 0)


        const shippedProducts = (order.shippedProducts - oldShipping.totalProducts)

        const timeLineObject = {
            type: 'SHIPPING',
            author: firebase.auth().currentUser.uid,
            date: new Date(),
            title: 'Se eliminó envio',
            message: `Se eliminó el envio realizado por medio de ${oldShipping.company}, `
        }

        if (oldShipping.trackingNumber) {
            timeLineObject.message += `con numero de guia ${oldShipping.trackingNumber}`
        } else {
            timeLineObject.message += `guia pendiente por añadir`
        }

        timeLine.push(timeLineObject)


        const orderObject = {
            balance: orderBalance,
            shipments: orderShipments,
            shipmentsPrice,
            shippedProducts,
            timeLine,
            updatedAt: new Date()
        }


        const notificationObject = {
            type: 'DELETED',
            collection: SHIPPING,
            author: firebase.auth().currentUser.uid,
            message: `Se elimino envio en el pedido ${order.serialCode} a nombre de ${client.name}.`,
            link: `pedidos/${oldShipping.orderId}`,
            date: new Date(),
            seen: seenArray
        }

        transaction.set(firebase.firestore().collection(NOTIFICATIONS).doc(), notificationObject)
        transaction.update(clientRef, { balance: clientBalance })
        transaction.update(orderRef, orderObject)
        transaction.delete(shippingRef)

        return
    })
    await algolia.deleteshipping(id)
    return 'DELETED'

}

export async function getShipmentsWithoutTrackingNumber() {
    const db = firebase.firestore().collection(SHIPPING).where('trackingNumber', '==', '').orderBy('createdAt', 'desc').limit(20)
    const snap = await db.get()
    const results = []
    snap.forEach(item => {
        results.push({ ...item.data(), id: item.id })
    })
    return results
}

export async function getShippingById(id) {
    const db = firebase.firestore().collection(SHIPPING).doc(id)
    const snap = await db.get()
    return { ...snap.data(), id: snap.id }
}

//-----------------------------------------------Notidications ---------------------------

async function addNotification(notification) {
    return await firebase.firestore().collection(NOTIFICATIONS).add(notification)
}

export function getUnSeeNotifications(cb){
    const uid = firebase.auth().currentUser.uid
    const databaseRef = firebase.firestore().collection(NOTIFICATIONS)
    const queryRef = databaseRef.where('seen','array-contains', uid).orderBy('date','desc').limit(20)
    const cancelFunction = queryRef.onSnapshot(data=>{
        const result = []
        data.forEach(item=>{
            result.push({...item.data(), id: item.id})
        })
        cb(result)
    })
    return cancelFunction
}


async function getSeenArray(){
    const allSellers = await getAllSellers(true)
    const seller = allSellers.map(seller => {
        return seller.id
    })
    const currentUser = firebase.auth().currentUser.uid
    return seller.filter(uid=>uid !== currentUser)
}


//-------------------------------------------- Handle Error ----------------------------------------------

const handleError = (cb) => (err) => {
    if (cb) {
        cb(err)
    } else {
        console.log(err)
    }
}