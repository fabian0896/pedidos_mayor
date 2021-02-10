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


    const ordersSnap = await firebase.firestore().collection(ORDERS).where('createdAt', '>=', dateStart.toDate()).where('createdAt', '<=', dateEnd.toDate()).limit(5).get()

    const ordersDataList = ordersSnap.docs.map(v => v.data())

    const newResult = formatDataOrders(ordersDataList)

    const db = firebase.firestore().collection(STATS).doc(`${year}`)
    const snap = await db.get()
    if(!snap.exists){
        return null
    }
    const result = snap.data()

    console.log(newResult)
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







//------------------ FUNCION PARA SCAR LAS ESTADISTICAS DE LOS PEDIDO ------------------


const formatDataOrders = (orderList=[]) =>{

    //obtener el numero de ordenes totales
    const totalOrders = orderList.length



    //opteniendo el numero total de prendas 
    const totalProducts = orderList.reduce((prev, curr)=>{
        return prev + curr.totalProducts
    },0)


    //Calcular los ingresos (incomes)
    const income = orderList.reduce((prev, order)=>{
        if(!order.payments) return prev

        const totalValue = Object.keys(order.payments).map(id => parseFloat(order.payments[id].value)).reduce((p,c)=> p + c, 0)

        if(order.currency == "COP"){
            return {
                ...prev,
                COP: prev.COP + totalValue
            }
        }else if(order.currency === "USD"){
            return{
                ...prev,
                USD: prev.USD + totalValue
            }
        }else{
            return prev
        }

    },{COP: 0, USD: 0})


    //calcular la cantidad de cada producto
    const products = {}
    orderList.forEach(order=>{
        order.products.forEach(product =>{
            if(!products[product.id]){
                products[product.id] = {
                    id: product.id,
                    line: product.line,
                    name: product.name,
                    quantity:parseInt(product.quantity)
                }
                return
            }
            products[product.id].quantity += parseInt(product.quantity)
        })
    })


    
    //clacular la cantidad por talla (sizes)
    const sizes = {}
    orderList.forEach(order=>{
        order.products.forEach(product =>{
            if(!sizes[product.size]){
                sizes[product.size] = {
                    id: String(product.size),
                    name: String(product.size),
                    quantity: parseInt(product.quantity)
                }
                return
            }
            sizes[product.size].quantity += parseInt(product.quantity)
        })
    })



    //calculo de semanas weeks

    



    return {
        totalOrders,
        totalProducts,
        income,
        products,
        sizes,
    }

}