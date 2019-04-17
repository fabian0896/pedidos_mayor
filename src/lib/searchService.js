import * as algoliasearch from 'algoliasearch'
import { getClientById } from './firebaseService'

const agoliaClient = algoliasearch('AKE68Y9274', 'f8604ef41d20eb78f752a3f55d935700')

const clientsIndex = agoliaClient.initIndex('clients');
const productsIndex = agoliaClient.initIndex('products');



//------------------- Clients --------------------------------------------------

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
    return clientsIds

}


//-------------------------------------- Products ---------------------------


export async function getProductLines(){
    const snap = await productsIndex.searchForFacetValues({
        facetName: 'line',
        facetQuery: ''
    })
    const result = snap.facetHits.map(hit => {
        const name = hit.value
        const count = hit.count
        const formatName = name.charAt(0).toUpperCase() + name.substring(1)
        return { name: formatName, count }
    })
    return result
}


export async function searchProduct(query,{formated}){
    const snap = await productsIndex.search({query})
    const results = snap.hits
    if(!formated){
        return results
    }
    const lines = []
    results.forEach(product => {
        const matchLine = lines.find(line => line.toLowerCase() === product.line.toLowerCase())
        if(!matchLine){
            lines.push(product.line)
        }
    })
    const formatedProducts = lines.map((lineValue)=>{
        const _products = results.filter(({line})=> line.toLowerCase() === lineValue.toLowerCase())
        return {
            name: lineValue,
            count: _products.length,
            products: _products.map(prod => ({...prod, id: prod.objectID}))
        }
    })
    return formatedProducts
}

export async function selectSearch(query){
    const res = await searchProduct(query,{formated: false})

    const formated = res.map(item =>{
        return{
            label: `${item.name}` ,
            value: item.objectID,
            secondary: `${item.line} (${item.reference})`
        }
    })
    return formated
}