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
const CLIENTS = 'clients'



export async function getYearStats(year){

    //Descomentat las siguientes lineas para actualizar las estadisticas basada en todos los pedidos
    //usar esto en caso de que fallen las cloud functions para ajustar las estadisticas a lso valores reales
    const dateStart = moment().year(year).month(0).date(1).hour(0).minute(0).second(0)
    const dateEnd = moment().year(year + 1).month(0).date(0).hour(23).minute(59).second(59)
    console.log(dateStart.toDate(), dateEnd.toDate())
    const ordersSnap = await firebase.firestore().collection(ORDERS).where('createdAt', '>=', dateStart.toDate()).where('createdAt', '<=', dateEnd.toDate()).get()
    const ordersDataList = ordersSnap.docs.map(v => v.data())
    const newResult = await formatDataOrders(ordersDataList)
    const  statsByMonth = await getStatsArrayByMonth(ordersDataList)
    const batch = firebase.firestore().batch()
    statsByMonth.forEach((data,index)=>{
        const ref = firebase.firestore().collection(STATS).doc(`${year}-${index+1}`)
        batch.set(ref, {...data, year: year, month: index+1})
    })
    await batch.commit()
    await firebase.firestore().collection(STATS).doc(`${year}`).set(newResult)
    console.log("Se actualizaron las estadisticas")




    //desde aqui empieza el funcionamiento normal 
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
            COP: result.income? numeral(result.income.COP || 0).format("$0,0"): 0,
            USD: result.income? numeral(result.income.USD || 0).format("$0,0") : 0
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


const formatDataOrders = async (orderList=[]) =>{

    //obtener todos los clientes
    const clientSnap = await firebase.firestore().collection(CLIENTS).get()
    const clientList = clientSnap.docs.reduce((prev, curr)=> {
        return {
            ...prev,
            [curr.id]: curr.data()
        }
    }, {})



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

        if(order.currency === "COP"){
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
    const weeks = {}
    orderList.forEach(order=>{
        const orderDate = moment(new Date(order.createdAt.seconds * 1000))
        const orderWeek = orderDate.week()

        if(!weeks[orderWeek]){
            weeks[orderWeek]={
                totalOrders: 1,
                totalProducts: order.products.reduce((p,c)=> p + parseInt(c.quantity), 0)
            }
            return
        }
        weeks[orderWeek] = {
            totalProducts: weeks[orderWeek].totalProducts + order.products.reduce((p,c)=> p + parseInt(c.quantity), 0),
            totalOrders: weeks[orderWeek].totalOrders + 1
        }

    })



    //agrupacion por cliente
    const clients = {}
    const countries = {}
    orderList.forEach(order=>{
        if(!clients[order.clientId]){
            clients[order.clientId] = {
                id: order.clientId,
                name: clientList[order.clientId].name,
                quantity: 1
            }
        }else{
            clients[order.clientId].quantity += 1
        }

        const actualClient = clientList[order.clientId]
        if(!countries[actualClient.country.alpha3Code]){
            countries[actualClient.country.alpha3Code] = {
                name: actualClient.country.translations.es,
                quantity: 1
            }
        }else{
            countries[actualClient.country.alpha3Code].quantity += 1
        }

    })



    return {
        totalOrders,
        totalProducts,
        income,
        products,
        sizes,
        weeks,
        clients,
        countries
    }

}



const getStatsArrayByMonth = async (orderList = [])=>{
    

    const dataMonth = {}
    orderList.forEach(order=>{
        const orderMont = moment(order.createdAt.seconds * 1000).month()
        if(!dataMonth[orderMont]){
            dataMonth[orderMont] = [order]
        }else{
            dataMonth[orderMont] = [...dataMonth[orderMont], order]
        }
    })

    const stats = []
    for(let month in dataMonth){
        const result  = await formatDataOrders(dataMonth[month])
        stats.push(result)
    }
    return stats
}