const URL= "https://translator-fajas.herokuapp.com/api/translate"


export async function translateText(text="", from="es", to="en"){
    const modelId = `${from}-${to}`

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    

    const data = JSON.stringify({
        text,
        modelId
    })

    const translationRes = await fetch(URL,{
        method: "POST",
        headers: myHeaders,
        body: data,
    }).then(res => res.json())


    return translationRes.translations[0].translation

}