import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {
    thousandSeparator
} from './utilities'


import moment from 'moment'
import numeral from 'numeral'

const STATS = 'stats'
const ORDERS = 'orders'


export async function getYearStats(year){

    const dateStart = moment().year(year).month(0).date(1).hour(0).minute(0).second(0)
    const dateEnd = moment().year(year + 1).month(0).date(0).hour(23).minute(59).second(59)

    console.log(dateStart.toDate(), dateEnd.toDate())


    const ordersSnap = await firebase.firestore().collection(ORDERS).where('createdAt', '>=', dateStart.toDate()).where('createdAt', '<=', dateEnd.toDate()).get()

    const ordersData = ordersSnap.docs.map(v => v.data())

    console.log(ordersData.length)

    const db = firebase.firestore().collection(STATS).doc(`${year}`)
    const snap = await db.get()
    if(!snap.exists){
        return null
    }
    const result = snap.data()

    console.log(result)

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

export async function getMonthStats(year, month){
    const db = firebase.firestore().collection(STATS).doc(`${year}-${month}`)
    const snap = await db.get()
    if(!snap.exists){
        return {}  
    }
    return snap.data()
}