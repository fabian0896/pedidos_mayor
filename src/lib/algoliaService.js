import * as algoliasearch from 'algoliasearch'

const agoliaClient = algoliasearch('AKE68Y9274', 'f8604ef41d20eb78f752a3f55d935700')

const clientsIndex = agoliaClient.initIndex('clients');
const productsIndex = agoliaClient.initIndex('products');
const ordersIndex = agoliaClient.initIndex('orders');


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

