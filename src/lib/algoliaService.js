import * as algoliasearch from 'algoliasearch'

const agoliaClient = algoliasearch('AKE68Y9274', 'f8604ef41d20eb78f752a3f55d935700')

const clientsIndex = agoliaClient.initIndex('clients');


export function addClient(client) {
    return clientsIndex.addObject(client)
}

export function updateClient(objectID, client){
    return clientsIndex.partialUpdateObject({...client, objectID})
}

export function deleteUser(objectID){
    return clientsIndex.deleteObject(objectID)
}

