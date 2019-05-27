import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {
    thousandSeparator
} from './utilities'


const STATS = 'stats'


export async function getYearStats(year){
    const db = firebase.firestore().collection(STATS).doc(`${year}`)
    const snap = await db.get()
    if(!snap.exists){
        return null
    }
    const result = snap.data()
    return {
        ...result,
        income:{
            COP: result.income? thousandSeparator((result.income.COP || 0), true): 0,
            USD: result.income? thousandSeparator((result.income.USD || 0), true): 0
        }
    }
}


export async function getMonthsOfYear(year){
    const db = firebase.firestore().collection(STATS).where('year','==', year).orderBy('month', 'asc')
    const snap = await db.get()
    const result = {}
    snap.forEach(item =>{
        const data = item.data()
        result[data.month] = data
    })
    return result
}