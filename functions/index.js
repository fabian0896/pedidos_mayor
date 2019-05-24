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
const STATS = 'stats'


function addProductsToStats(products){
    const productsObject = products.reduce((prev, current) =>{
        const quantity = parseInt(prev[current.id]?prev[current.id].quantity : 0) 
        prev[current.id] = {
            id: current.id,
            name: current.name,
            quantity: quantity + parseInt(current.quantity)
        }
        return prev
    }, {})
    const productsresult = Object.keys(productsObject).map(id => productsObject[id]).reduce((prev, current)=>{
         prev[current.id] = Object.assign({}, current, {quantity: admin.firestore.FieldValue.increment(parseInt(current.quantity))})
         return prev
    }, {})
    return productsresult
}


//--------------------------------------- Fuctions -------------------------------



exports.addOrder = functions.firestore.document(`${ORDERS}/{orderId}`).onCreate((snap, context)=>{

    const order = snap.data()

    return admin.firestore().collection(CLIENTS).doc(order.clientId).get().then(clientSnap=>{
        const client = clientSnap.data()
        
        const products = addProductsToStats(order.products)
    
        const totalProducts = admin.firestore.FieldValue.increment(order.totalProducts)
        const totalOrders = admin.firestore.FieldValue.increment(1)  
    
        const clients = {}
        clients[order.clientId] = {
            quantity: admin.firestore.FieldValue.increment(1),
            id: order.clientId,
            name: client.name
        }
    
        const countries ={}
        countries[client.country.alpha3Code] = {
            quantity: admin.firestore.FieldValue.increment(1),
            name: client.country.translations.es || client.country.name
        }

        return admin.firestore().collection(STATS).doc('fechaPrueba').set({
            products,
            totalProducts,
            totalOrders,
            clients,
            countries
        },{merge:true})
    
    }).catch(err => {
        console.log('Error:' + err)
    })

    

})




exports.updateOrder = functions.firestore.document(`${ORDERS}/{orderId}`).onUpdate((snap, context)=>{
    //console.log(context, snap)
    return 'OK'
})




exports.deleteOrder = functions.firestore.document(`${ORDERS}/{orderId}`).onDelete((snap, context)=>{
    //console.log(context, snap)
    return 'OK'
})
