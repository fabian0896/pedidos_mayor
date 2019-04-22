const API_KEY = 'bd54be8d83adc1460791'
const END_POINT = `https://free.currconv.com/api/v7/convert?&compact=ultra&apiKey=${API_KEY}`

export async function convertCurrency(from, to, value=0){
    const FROM = from.toUpperCase()
    const TO = to.toUpperCase()
    const URL = `${END_POINT}&q=${FROM}_${TO}`
    const res = await fetch(URL)
    const data = await res.json()
    const rate = data[`${FROM}_${TO}`]
    return value*rate
}