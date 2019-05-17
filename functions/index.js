const functions = require('firebase-functions');
const admin = require('firebase-admin');
var algoliasearch = require('algoliasearch');

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


function thousandSeparator(value){
    const temp = value.toString().split('').reverse()
    const withPionts = temp.map((val, index)=>{
        if((index+1)%3 === 0){
            if(index === (temp.length-1)){
                return val
            }
            return '.' + val
        }else{
            return val
        }
    })
    return withPionts.reverse().join('')
} 



function getAction(type){
    switch(type){
        case 'CREATED':{
            return 'agregó'
        }
        case 'UPDATED':{
            return 'actualizó'
        }
        case 'DELETED':{
            return 'borró'
        }
        default:{
            break
        }
    }
    return null
}


function createNotifiaction(collection, docId, data, type){    
    switch(collection){
        case CLIENTS:{
            const clientName = data.name
            const clientCountry = data.country.translations.es || data.country.name
            return{
                type,
                collection,
                link: `clientes/${docId}`,
                message: `Se ${getAction(type)} el cliente ${clientName} de ${clientCountry}`,
                date: new Date()
            }
        }
        case SHIPPING:{
            const orderId = data.order.orderId
            const serialCode = data.order.label
            const clientName = data.order.secondary
            return{
                type,
                collection,
                link: `pedidos/${orderId}`,
                message: `Se ${getAction(type)} un envio del pedido ${serialCode} a nombre de ${clientName}`,
                date: new Date()
            }
        }
        case ORDERS:{
            const orderId = data.id 
            return{
                type,
                collection,
                link: `pedidos/${orderId}`,
                message: `Se ${getAction(type)} el pedido ${data.serialCode}, ${data.totalProducts} prendas`,
                date: new Date()
            }
        }
        case PAYMENTS:{
            const orderId =  data.orderId
            return{
                type,
                collection,
                link: `pedidos/${orderId}`,
                message: `Se ${getAction(type)} pago del pedido ${data.orderSeralCode} por valor de ${data.currency} $${thousandSeparator(data.value)}`,
                date: new Date()
            }
        }
        default:{
            break;
        }
    }
    return null
}






exports.orderCreated = functions.firestore.document('{collection}/{doc}').onWrite((snap, context)=>{
    console.log(context.params.collection, context.params.doc, context.eventType)
    return 'OK'
})
