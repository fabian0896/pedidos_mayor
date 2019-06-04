
//const apiKey = "Basic " + btoa("ventas@fajasinternacionales:Redes2017");

export async function getResumePdf(order, client){
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