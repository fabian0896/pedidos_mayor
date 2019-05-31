

export function getResumePdf(order, client){
    const finalObject = {
        ...order,
        client
    }
    console.log(JSON.stringify(finalObject))
}