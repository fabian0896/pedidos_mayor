import { formatProductForTable } from './utilities'
import { getAllProducts } from './firebaseService'
//const apiKey = "Basic " + btoa("ventas@fajasinternacionales:Redes2017");


// para usar jsreport online descomentar esta parte del codigo y comentar la otra 

//const URL_STRING = 'https://fajasinternacionales.jsreportonline.net/api/report'
//const PDF_REPORT_ID = "HylorYCTaE"
//const EXC_ES_ID = "rkeXJcARmU"
//const EXC_EN_ID = "Hyl46ulCdL"
//const EXC_PODUCTION = "S1ljUJUAOL"



//Para usar el servidor perzonalizado descomentar esta parte del codifo y comentar la otra



const URL_STRING = 'https://pedidosbybethel.tk/api/report'
const PDF_REPORT_ID = "HylorYCTaE"
const EXC_ES_ID = "rkeXJcARmU"
const EXC_EN_ID = "Hyl46ulCdL"
const EXC_PODUCTION = "S1ljUJUAOL"


export async function getResumePdf(order, client){
    //const [formatData, sizeList] = formatProductForTable(order)
    
    const finalObject = {
        ...order,
        client
    }



    const res = await fetch(URL_STRING,{
        method: 'POST',
        mode: 'cors',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': "Basic " + btoa("ventas@fajasinternacionales.com:Redes2017")
        },
        body: JSON.stringify({
            template: {
                "shortid": PDF_REPORT_ID
            },
            data: finalObject
        })
    })

    const report = await res.blob()

    const fileURL = URL.createObjectURL(report);
    var link = document.createElement('a');
    link.href = fileURL;
    link.download = `pedido-${order.serialCode}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    return;
}



export async function getResumeExc(order, client){


    //le doy formato a los productos y me traigo una lista con todos los productos actualizados
    let [products, sizeList] = formatProductForTable(order.products)
    


    
    //Detecto el si el idioma del cliente es espanol 
    let shortid = ''
    const {country:{languages} } = client
    const spanish = isSpanish(languages)

    if(spanish){
        shortid = EXC_ES_ID
    }else{
        shortid = EXC_EN_ID
        const allProducts = await getAllProducts()
        products = products.map(product =>{
            return {
                ...product,
                name_en: allProducts[product.id]? allProducts[product.id].name_en : null 
            }
        })
    }
   

    const finalObject = {
        ...order,
        products,
        sizeList,
        client
    }

    
    const res = await fetch(URL_STRING,{
        method: 'POST',
        mode: 'cors',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': "Basic " + btoa("ventas@fajasinternacionales.com:Redes2017")
        },
        body: JSON.stringify({
            template: {
                shortid
            },
            data: finalObject
        })
    })

    const report = await res.blob()

    const fileURL = URL.createObjectURL(report);
    var link = document.createElement('a');
    link.href = fileURL;
    link.download = `pedido ${order.consecutive || order.serialCode} ${client.name}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return;
}



const isSpanish = (languages=[]) =>{
    return languages.some(element => element.iso639_1 === 'es')
}





export async function getProductionResumeExc(order, client, type){

    const [products, sizeList] = formatProductForTable(order.products)
    
    const finalObject = {
        ...order,
        products: fiterByType(products, type),
        sizeList,
        client,
        type
    }

    const shortid = EXC_PODUCTION
      
    const res = await fetch(URL_STRING,{
        method: 'POST',
        mode: 'cors',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': "Basic " + btoa("ventas@fajasinternacionales.com:Redes2017")
        },
        body: JSON.stringify({
            template: {
                shortid
            },
            data: finalObject
        })
    })

    const report = await res.blob()

    const fileURL = URL.createObjectURL(report);
    var link = document.createElement('a');
    link.href = fileURL;
    link.download = `Producción ${type} Pedido ${ order.consecutive ||order.serialCode} ${client.name}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return;
}


const fiterByType = (products=[], type='latex')=>{
    if(type === 'powernet'){
        return products.filter((products)=> products.line === 'powernet')
    } else if(type === 'latex'){
        return products.filter((products)=> products.line !== 'powernet')
    }else{
        return products
    }
}   
