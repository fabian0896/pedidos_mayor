const moment = require('moment-timezone')
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const CLIENTS = 'clients'
const CODES = 'codes'
const SELLERS = 'sellers'
const PRODUCTS = 'products'
const ORDERS = 'orders'
const PAYMENTS = 'payments'
const SHIPPING = 'shipping'
const STATS = 'stats'


function addProductsToStats(products) {
    const productsObject = products.reduce((prev, current) => {
        const quantity = parseInt(prev[current.id] ? prev[current.id].quantity : 0)
        prev[current.id] = {
            id: current.id,
            name: current.name,
            line: current.line,
            quantity: quantity + parseInt(current.quantity)
        }
        return prev
    }, {})
    const productsresult = Object.keys(productsObject).map(id => productsObject[id]).reduce((prev, current) => {
        prev[current.id] = Object.assign({}, current, { quantity: admin.firestore.FieldValue.increment(parseInt(current.quantity)) })
        return prev
    }, {})
    return productsresult
}



function deleteProductsToStats(products) {
    const productsObject = products.reduce((prev, current) => {
        const quantity = parseInt(prev[current.id] ? prev[current.id].quantity : 0)
        prev[current.id] = {
            id: current.id,
            name: current.name,
            line: current.line,
            quantity: quantity + parseInt(current.quantity)
        }
        return prev
    }, {})
    const productsresult = Object.keys(productsObject).map(id => productsObject[id]).reduce((prev, current) => {
        prev[current.id] = Object.assign({}, current, { quantity: admin.firestore.FieldValue.increment(-parseInt(current.quantity)) })
        return prev
    }, {})
    return productsresult
}


function updateProductsToStats(newProducts, oldProducts){
    const oldProductsObject = oldProducts.reduce((prev, current) => {
        const quantity = parseInt(prev[current.id] ? prev[current.id].quantity : 0)
        prev[current.id] = {
            id: current.id,
            name: current.name,
            line: current.line,
            quantity: quantity + parseInt(current.quantity)
        }
        return prev
    }, {})
    const newProductsObject = newProducts.reduce((prev, current) => {
        const quantity = parseInt(prev[current.id] ? prev[current.id].quantity : 0)
        prev[current.id] = {
            id: current.id,
            name: current.name,
            line: current.line,
            quantity: quantity + parseInt(current.quantity)
        }
        return prev
    }, {})


    const productsresult = {}
    Object.keys(newProductsObject).forEach(productId=>{
        const newQuantity = newProductsObject[productId].quantity
        const oldQuantity = oldProductsObject[productId] ? oldProductsObject[productId].quantity : 0
        productsresult[productId] = {
            id: productId,
            name: newProductsObject[productId].name,
            line: newProductsObject[productId].line,
            quantity: newQuantity - oldQuantity
        }
    })
    Object.keys(oldProductsObject).forEach(productId=>{
        if(productsresult[productId]){
            return
        }
        productsresult[productId] = {
            id: productId,
            name: oldProductsObject[productId].name,
            line: oldProductsObject[productId].line,
            quantity: -oldProductsObject[productId].quantity
        }
    })

    const results = Object.keys(productsresult).map(id => productsresult[id]).reduce((prev, current) => {
        prev[current.id] = Object.assign({}, current, { quantity: admin.firestore.FieldValue.increment(parseInt(current.quantity)) })
        return prev
    }, {})
    return results

}


function addGrupBy(products, key){
    const productsObject = products.reduce((prev, current) => {
        const quantity = parseInt(prev[current[key]] ? prev[current[key]].quantity : 0)
        prev[current[key]] = {
            id: current[key],
            name: current[key],
            quantity: quantity + parseInt(current.quantity)
        }
        return prev
    }, {})
    const productsresult = Object.keys(productsObject).map(id => productsObject[id]).reduce((prev, current) => {
        prev[current.id] = Object.assign({}, current, { quantity: admin.firestore.FieldValue.increment(parseInt(current.quantity)) })
        return prev
    }, {})
    return productsresult
}



function deleteGrupBy(products, key) {
    const productsObject = products.reduce((prev, current) => {
        const quantity = parseInt(prev[current[key]] ? prev[current[key]].quantity : 0)
        prev[current[key]] = {
            id: current[key],
            name: current[key],
            quantity: quantity + parseInt(current.quantity)
        }
        return prev
    }, {})
    const productsresult = Object.keys(productsObject).map(id => productsObject[id]).reduce((prev, current) => {
        prev[current.id] = Object.assign({}, current, { quantity: admin.firestore.FieldValue.increment(-parseInt(current.quantity)) })
        return prev
    }, {})
    return productsresult
}




function updateGrupBy(newProducts, oldProducts, key){
    const oldProductsObject = oldProducts.reduce((prev, current) => {
        const quantity = parseInt(prev[current[key]] ? prev[current[key]].quantity : 0)
        prev[current[key]] = {
            id: current[key],
            name: current[key],
            quantity: quantity + parseInt(current.quantity)
        }
        return prev
    }, {})
    const newProductsObject = newProducts.reduce((prev, current) => {
        const quantity = parseInt(prev[current[key]] ? prev[current[key]].quantity : 0)
        prev[current[key]] = {
            id: current[key],
            name: current[key],
            quantity: quantity + parseInt(current.quantity)
        }
        return prev
    }, {})


    const productsresult = {}
    Object.keys(newProductsObject).forEach(productId=>{
        const newQuantity = newProductsObject[productId].quantity
        const oldQuantity = oldProductsObject[productId] ? oldProductsObject[productId].quantity : 0
        productsresult[productId] = {
            id: productId,
            name: productId,
            quantity: newQuantity - oldQuantity
        }
    })
    Object.keys(oldProductsObject).forEach(productId=>{
        if(productsresult[productId]){
            return
        }
        productsresult[productId] = {
            id: productId,
            name: productId,
            quantity: -oldProductsObject[productId].quantity
        }
    })

    const results = Object.keys(productsresult).map(id => productsresult[id]).reduce((prev, current) => {
        prev[current.id] = Object.assign({}, current, { quantity: admin.firestore.FieldValue.increment(parseInt(current.quantity)) })
        return prev
    }, {})
    return results

}





function getDate(userDate) {
    const date = moment(userDate).tz('America/Bogota')
    const month = date.month() + 1
    const year = date.year()
    const week = date.week()
    return [month, year, week, date]
}



//--------------------------------------- Fuctions -------------------------------



exports.addOrder = functions.firestore.document(`${ORDERS}/{orderId}`).onCreate((snap, context) => {

    const order = snap.data()
    const [month, year, week] = getDate()

    return admin.firestore().collection(CLIENTS).doc(order.clientId).get().then(clientSnap => {
        const client = clientSnap.data()

        const products = addProductsToStats(order.products)

        const totalProducts = admin.firestore.FieldValue.increment(order.totalProducts)
        const totalOrders = admin.firestore.FieldValue.increment(1)


        const sizes = addGrupBy(order.products, 'size')

        const clients = {}
        clients[order.clientId] = {
            quantity: admin.firestore.FieldValue.increment(1),
            id: order.clientId,
            name: client.name
        }

        const countries = {}
        countries[client.country.alpha3Code] = {
            quantity: admin.firestore.FieldValue.increment(1),
            name: client.country.translations.es || client.country.name
        }

        return Promise.all([
            admin.firestore().collection(STATS).doc(`${year}-${month}`).set({
                year,
                month,
                products,
                totalProducts,
                totalOrders,
                clients,
                countries,
                sizes
            }, { merge: true }),
            admin.firestore().collection(STATS).doc(`${year}`).set({
                products,
                totalProducts,
                totalOrders,
                clients,
                countries,
                sizes,
                weeks:{
                    [week]: {
                        totalOrders,
                        totalProducts
                    }
                }
            }, { merge: true })
        ])
    }).catch(err => {
        console.log('Error:' + err)
    })

})




exports.updateOrder = functions.firestore.document(`${ORDERS}/{orderId}`).onUpdate((change, context) => {
    //console.log(context, snap)
    const oldOrder = change.before.data()
    const newOrder = change.after.data()

    const [month, year, week] = getDate(oldOrder.createdAt.seconds * 1000)

    const sizes = updateGrupBy(newOrder.products, oldOrder.products, 'size')
    const products = updateProductsToStats(newOrder.products, oldOrder.products)
    const totalProducts = admin.firestore.FieldValue.increment(newOrder.totalProducts - oldOrder.totalProducts)

    return Promise.all([
        admin.firestore().collection(STATS).doc(`${year}-${month}`).set({
            products,
            totalProducts,
            sizes
        }, { merge: true }),
        admin.firestore().collection(STATS).doc(`${year}`).set({
            products,
            totalProducts,
            sizes,
            weeks:{
                [week]: {
                    totalProducts
                }
            }
        }, { merge: true })
    ])

})




exports.deleteOrder = functions.firestore.document(`${ORDERS}/{orderId}`).onDelete((snap, context) => {
    const order = snap.data()
    const [month, year, week] = getDate(order.createdAt.seconds * 1000)
    return admin.firestore().collection(CLIENTS).doc(order.clientId).get().then(clientSnap => {
        const client = clientSnap.data()

        const products = deleteProductsToStats(order.products)
        const sizes = deleteGrupBy(order.products, 'size')

        const totalProducts = admin.firestore.FieldValue.increment(-order.totalProducts)
        const totalOrders = admin.firestore.FieldValue.increment(-1)

        const clients = {}
        clients[order.clientId] = {
            quantity: admin.firestore.FieldValue.increment(-1),
            id: order.clientId,
            name: client.name
        }

        const countries = {}
        countries[client.country.alpha3Code] = {
            quantity: admin.firestore.FieldValue.increment(-1),
            name: client.country.translations.es || client.country.name
        }

        return  Promise.all([
            admin.firestore().collection(STATS).doc(`${year}-${month}`).set({
                products,
                clients,
                countries,
                totalOrders,
                totalProducts,
                sizes
            }, { merge: true }),
            admin.firestore().collection(STATS).doc(`${year}`).set({
                products,
                clients,
                countries,
                totalOrders,
                totalProducts,
                sizes,
                weeks:{
                    [week]: {
                        totalOrders,
                        totalProducts
                    }
                }
            }, { merge: true })
        ])

    })

})




exports.addPayment = functions.firestore.document(`${PAYMENTS}/{payment}`).onCreate((snap, context)=>{
    const payment = snap.data()
    const [month, year] = getDate()
    
    const income = {}
    income[payment.currency] = admin.firestore.FieldValue.increment(parseFloat(payment.value))

    return Promise.all([
        admin.firestore().collection(STATS).doc(`${year}-${month}`).set({
            income
        },{merge: true}),
        admin.firestore().collection(STATS).doc(`${year}`).set({
            income
        },{merge: true})    
    ])
    
})


exports.updatePayment = functions.firestore.document(`${PAYMENTS}/{payment}`).onUpdate((change, context)=>{
    
    
    return 'Ok'
})


exports.deletePayment = functions.firestore.document(`${PAYMENTS}/{payment}`).onDelete((snap, context)=>{
    const payment = snap.data()
    const [month, year] = getDate(payment.createdAt.seconds*1000)
    
    const income = {}
    income[payment.currency] = admin.firestore.FieldValue.increment(parseFloat(-payment.value))

    return Promise.all([
        admin.firestore().collection(STATS).doc(`${year}-${month}`).set({
            income
        },{merge: true}),
        admin.firestore().collection(STATS).doc(`${year}`).set({
            income
        },{merge: true})
    ])

})



exports.addShipping = functions.firestore.document(`${SHIPPING}/{doc}`).onCreate((snap,context)=>{
        const shipping = snap.data()
        const [month, year] = getDate(shipping.createdAt.seconds*1000)
        let updatingObject = {}
        if(shipping.paymentMethod === 'payHere'){
            updatingObject[shipping.currency] = admin.firestore.FieldValue.increment(-shipping.price)    
        }else{
            updatingObject[shipping.currency] = admin.firestore.FieldValue.increment(0)    
        }

        return Promise.all([
            admin.firestore().collection(STATS).doc(`${year}-${month}`).set({
                income: updatingObject
            }, {merge: true}),
            admin.firestore().collection(STATS).doc(`${year}`).set({
                income: updatingObject
            }, {merge: true})
        ])
})


exports.updateShipping = functions.firestore.document(`${SHIPPING}/{doc}`).onUpdate((change,context)=>{
    const newShipping = change.after.data()
    const oldShipping = change.before.data()
    const [month, year] = getDate(oldShipping.createdAt.seconds*1000)
    let updatingObject = {}
    if(oldShipping.paymentMethod === 'payHere' && newShipping.paymentMethod === "payHere"){
        //todo sigue igual
        updatingObject[newShipping.currency] = admin.firestore.FieldValue.increment(newShipping.price - oldShipping.price)
    }else if( oldShipping.paymentMethod === 'payHere' && newShipping.paymentMethod !== 'payHere'){
        //toca descintar el valor del envios
        updatingObject[newShipping.currency] = admin.firestore.FieldValue.increment(oldShipping.price)
    }else if(oldShipping.paymentMethod !== 'payHere' && newShipping.paymentMethod === 'payHere'){
        //toca agregar el valor del envio
        updatingObject[newShipping.currency] = admin.firestore.FieldValue.increment(-newShipping.price)
    }

    return Promise.all([
        admin.firestore().collection(STATS).doc(`${year}-${month}`).set({
            income: updatingObject
        }, {merge: true}),
        admin.firestore().collection(STATS).doc(`${year}`).set({
            income: updatingObject
        }, {merge: true})
    ])

})


exports.deleteShipping = functions.firestore.document(`${SHIPPING}/{doc}`).onDelete((snap,context)=>{
        const shipping = snap.data()
        const [month, year] = getDate(shipping.createdAt.seconds*1000)
        let updatingObject = {}
        if(shipping.paymentMethod === 'payHere'){
            updatingObject[shipping.currency] = admin.firestore.FieldValue.increment(shipping.price)    
        }else{
            updatingObject[shipping.currency] = admin.firestore.FieldValue.increment(0)    
        }

        return Promise.all([
            admin.firestore().collection(STATS).doc(`${year}-${month}`).set({
                income: updatingObject
            }, {merge: true}),
            admin.firestore().collection(STATS).doc(`${year}`).set({
                income: updatingObject
            }, {merge: true})
        ])
})
