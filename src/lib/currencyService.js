import firebase from 'firebase/app'
import 'firebase/firestore' 
import moment from 'moment'

const API_KEY = 'bd54be8d83adc1460791'
const END_POINT = `https://free.currconv.com/api/v7/convert?&compact=ultra&apiKey=${API_KEY}`


export async function convertCurrency(from, to, value=0){
    const {dbValue, isInDb} = await getConvetFromDb(from, to, value)
    if(isInDb){
        return dbValue
    }
    
    const FROM = from.toUpperCase()
    const TO = to.toUpperCase()
    const URL = `${END_POINT}&q=${FROM}_${TO}`
    try {
        const res = await fetch(URL)
        const data = await res.json()
        const rate = data[`${FROM}_${TO}`]
    
        await addCurrencyToDb(from, to, rate)
      
        return value*rate
    } catch (error) {
        console.error('Error al convertir la moneda:', error)
        return 0
    }
}


async function  addCurrencyToDb(from, to, rate=0){
    const docRef = firebase.firestore().collection('codes').doc('currencies')
    await firebase.firestore().runTransaction(async transaction =>{
        const snapData = await transaction.get(docRef)

        const data = snapData.data()
        const date = moment()

        const key = `${date.date()}-${date.month()+1}-${date.year()}`
        
        const thisDayData = data[key]

        const objectValue = {
            [key]:{
                [`${from}_${to}`]: rate
            }
        }

        if(!thisDayData){
            // no existe el dia asi que hay que sobre escribir todo el objetoç
            transaction.set(docRef, objectValue)
            return
        }

        const currencyChange = thisDayData[`${from}_${to}`]


        if(!currencyChange){
            //si existe el dia pero no exiiste el tipo de cambio por lo que solo hay que actualizarlo
            transaction.set(docRef, objectValue,{merge: true})

            return 
        }

        return
    })
}



async function getConvetFromDb(from, to, value=0){
    const doc = firebase.firestore().collection('codes').doc('currencies')
    const snap = await doc.get()
    const data = snap.data()
    const date = moment()

    const key = `${date.date()}-${date.month()+1}-${date.year()}`
       
    const thisDayData = data[key]

    if(!thisDayData){
        return {dbValue: null, isInDb: false}
    }

    const currencyChange = thisDayData[`${from}_${to}`]

    if(!currencyChange){
        return {dbValue: null, isInDb: false}
    }

    return {dbValue: value*currencyChange, isInDb: true}
}