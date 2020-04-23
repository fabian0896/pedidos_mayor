import { formatProductForTable } from './utilities'
//const apiKey = "Basic " + btoa("ventas@fajasinternacionales:Redes2017");

export async function getResumePdf(order, client){
    const [formatData, sizeList] = formatProductForTable(order)
    
    const finalObject = {
        ...order,
        client
    }



    const res = await fetch('https://fajasinternacionales.jsreportonline.net/api/report',{
        method: 'POST',
        mode: 'cors',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': "Basic " + btoa("ventas@fajasinternacionales.com:Redes2017")
        },
        body: JSON.stringify({
            template: {
                "shortid":"HylorYCTaE"
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

    const [products, sizeList] = formatProductForTable(order.products)
    
    const finalObject = {
        ...order,
        products,
        sizeList,
        client
    }

    //console.log(finalObject)

    //Detecto el si el idioma del cliente es espanol 
    let shortid = ''
    const {country:{languages} } = client
    const spanish = isSpanish(languages)

    if(spanish){
        shortid = 'rkeXJcARmU'
    }else{
        shortid = 'Hyl46ulCdL'
    }
   
    
    const res = await fetch('https://fajasinternacionales.jsreportonline.net/api/report',{
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
    link.download = `pedido ${order.serialCode} ${client.name}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return;
}



const isSpanish = (languages=[]) =>{
    return languages.some(element => element.iso639_1 === 'es')
}
