import * as algoliasearch from 'algoliasearch'

const agoliaClient = algoliasearch('AKE68Y9274', 'f8604ef41d20eb78f752a3f55d935700')

const clientsIndex = agoliaClient.initIndex('clients');
const productsIndex = agoliaClient.initIndex('products');
const ordersIndex = agoliaClient.initIndex('orders');
const paymentsIndex = agoliaClient.initIndex('payments');
const shippingIndex = agoliaClient.initIndex('shipments')


//------------------------ Clients ---------------------------

export function addClient(client) {
    return clientsIndex.addObject(client)
}

export function updateClient(objectID, client){
    return clientsIndex.partialUpdateObject({...client, objectID})
}

export function deleteUser(objectID){
    return clientsIndex.deleteObject(objectID)
}


// -------------------- Clients -------------------------

export function addProduct(product){
    return productsIndex.addObject(product)
}

export function updateProduct(objectID, product){
    return productsIndex.partialUpdateObject({...product, objectID})
}

export function deleteProduct(objectID){
    return productsIndex.deleteObject(objectID)
}


//--------------------------Orders ---------------

export function addOrder(order){
    return ordersIndex.addObject(order)
}

export function updateOrder(objectID, order){
    return ordersIndex.partialUpdateObject({...order, objectID})
}

export function deleteOrder(objectID){
    return ordersIndex.deleteObject(objectID)
}

//--------------------------payments----------------------

export function addPayment(payment){
    return paymentsIndex.addObject(payment)
}

export function updatepayment(objectID, payment){
    return paymentsIndex.partialUpdateObject({...payment, objectID})
}

export function deletepayment(objectID){
    return paymentsIndex.deleteObject(objectID)
}


// ---------------------------Envios----------------------------

export function addshipping(shipping){
    return shippingIndex.addObject(shipping)
}

export function updateshipping(objectID, shipping){
    return shippingIndex.partialUpdateObject({...shipping, objectID})
}

export function deleteshipping(objectID){
    return shippingIndex.deleteObject(objectID)
}

