import * as algoliasearch from 'algoliasearch'
import { getClientById } from './firebaseService'

const agoliaClient = algoliasearch('AKE68Y9274', 'f8604ef41d20eb78f752a3f55d935700')

const clientsIndex = agoliaClient.initIndex('clients');


export async function searchClient(uid, name=""){
    const searchOptions ={ 
        query: name,
        hitsPerPage: 30,
    }

    if(uid){
        searchOptions['filters'] = `seller:${uid}`
    }
    
    const { hits } = await clientsIndex.search(searchOptions)

    const promises = hits.map(client => {
        return getClientById(client.objectID)
    })

    return Promise.all(promises)

}

export async function searchClientsIds(uid, name=""){
    
    const searchOptions ={ 
        query: name,
        hitsPerPage: 30,
    }

    if(uid){
        searchOptions['filters'] = `seller:${uid}`
    }
    
    const { hits } = await clientsIndex.search(searchOptions)

    const clientsIds = hits.map(client => {
        return client.objectID
    })
    console.log('no hago mas peticiones a firebase', clientsIds)
    return clientsIds

}
