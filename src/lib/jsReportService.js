import { formatProductForTable } from './utilities'
import { getAllProducts, getOrderByMonth } from './firebaseService'
import { translateText } from './translatorService'
import moment from 'moment'
import numeral from 'numeral'
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


export async function getResumePdf(order, client) {
    //const [formatData, sizeList] = formatProductForTable(order)

    const finalObject = {
        ...order,
        client
    }



    const res = await fetch(URL_STRING, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "apikey " + btoa("ventas@fajasinternacionales.com:Redes2017")
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



export async function getResumeExc(order, client) {


    //le doy formato a los productos y me traigo una lista con todos los productos actualizados
    let [products, sizeList] = formatProductForTable(order.products)




    //Detecto el si el idioma del cliente es espanol 
    let shortid = ''
    const { country: { languages } } = client
    const spanish = isSpanish(languages)

    if (spanish) {
        shortid = EXC_ES_ID
    } else {
        shortid = EXC_EN_ID


        // get de variasnt translations and then add that to de products

        //const productsVarianstsPromises = products.map(product => translateText(product.color, 'es', 'en'))
        //const varianstsTranslatiosn = await Promise.all(productsVarianstsPromises)
        //console.log(varianstsTranslatiosn)


        const allProducts = await getAllProducts()
        products = products.map(product => {
            return {
                ...product,
                name_en: allProducts[product.id] ? allProducts[product.id].name_en : null,
            }
        })

    }


    const finalObject = {
        ...order,
        products,
        sizeList,
        client
    }


    console.log(JSON.stringify(finalObject))

    const res = await fetch(URL_STRING, {
        method: 'POST',
        mode: 'cors',
        headers: {
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



const isSpanish = (languages = []) => {
    return languages.some(element => element.iso639_1 === 'es')
}





export async function getProductionResumeExc(order, client, type) {

    const [products, sizeList] = formatProductForTable(order.products)

    const finalObject = {
        ...order,
        products: fiterByType(products, type),
        sizeList,
        client,
        type
    }

    console.log(JSON.stringify(finalObject))

    const shortid = EXC_PODUCTION

    const res = await fetch(URL_STRING, {
        method: 'POST',
        mode: 'cors',
        headers: {
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
    link.download = `Producción ${type} Pedido ${order.consecutive || order.serialCode} ${client.name}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    return;
}


const fiterByType = (products = [], type = 'latex') => {
    if (type === 'powernet') {
        return products.filter((products) => products.line === 'powernet')
    } else if (type === 'latex') {
        return products.filter((products) => products.line !== 'powernet')
    } else {
        return products
    }
}








export const monthReport = async (month, year) => {

    const start = moment().year(year).month(month-1).date(1).hour(0).minute(0) // se le suma uno por que los mese empiezan en 0
    const date = start.format('MMMM') 
    const end = moment().year(year).month(month).date(1).hour(23).minute(0).subtract(1,'day')

    //console.log(start.toDate(), end.toDate())

    // crear funccion par ahacer la consulta a la base de datos poniendo las fechas especificas
    const orders = (await getOrderByMonth(start.toDate(), end.toDate())).map(order=>{
        const total = numeral(parseFloat(order.total ) + parseFloat(order.shipmentsPrice || 0)).format('$0,0.00')
        const balance = numeral(parseFloat(order.balance)).format('$0,0.00')

        return {
            ...order,
            total: `${total} ${order.currency}`,
            balance: `${balance} ${order.currency}`
        }
    })

    


    // organizar los datos y enviarlos a js report 
    const result = {
        month: date,
        start: start.format('DD/MMMM/YYYY'),
        end: end.format('DD/MMMM/YYYY'),
        orders
    }

    
    const res = await fetch(URL_STRING, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Basic " + btoa("ventas@fajasinternacionales.com:Redes2017")
        },
        body: JSON.stringify({
            template: {
                shortid: "ryxonbTy68"
            },
            data: result
        })
    })



    //recibir el archivo y descargarlo

    const report = await res.blob()

    const fileURL = URL.createObjectURL(report);
    var link = document.createElement('a');
    link.href = fileURL;
    link.type = "application/pdf"
    link.download = `Reporte de pedidos mes de ${date}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();


    // fin de la funcion

    return

}
