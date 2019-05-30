import React, { Component } from 'react';
import HeaderLayout from '../../componets/headerLayout/HeaderLayout'
import StatsCard from '../../componets/statsCard/StatsCard';
import {
    Widgets as WidgetsIcon,
    Event as EventIcon,
    AssignmentLate as AssignmentLateIcon,
    AccessibilityNew as AccessibilityNewIcon,
} from '@material-ui/icons'
import StatsCardList from '../../componets/statsCard/StatsCardList';
import OrderResume from '../../componets/orderResume/OrderResume';
import SearchBar from '../../componets/searchBar/SearchBar';
import OrederGrid from '../../componets/orderResume/OrderGrid';
import Section from '../../componets/section/Section';
import OrderSlideList from '../../componets/orderResume/OrderSlideList';
import {connect } from 'react-redux'
import { getAllOrders, getUnShippedOrders } from '../../lib/firebaseService'
import { getYearStats, getMonthStats } from '../../lib/statsService'

import Title from '../../componets/title/Title'
import { searchOrder } from '../../lib/searchService'
import { Paper } from '@material-ui/core';
import Loader from '../../componets/loader/Loader';
import { Search as SearchIcon } from '@material-ui/icons'
import moment from 'moment'


const MONTHS ={
    1:'Enero',
    2:'Febrero',
    3:'Marzo',
    4:'Abril',
    5:'Mayo',
    6:'Junio',
    7:'Julio',
    8:'Agosto',
    9:'Septiembre',
    10:'Octubre',
    11:'Noviembre',
    12:'Diciembre',
}



class Pedidos extends Component {
    
    state = {
        noRender: true,
        orders: [],
        pendingOrders: [],
        isSearching: false,
        searchResult: [],
        loadingSearch: false,
        yearStats: null,
        montStats: null
    }

    async componentDidMount(){
        const orders = await getAllOrders()
        const pendingOrders = await getUnShippedOrders()
        const orderList = Object.keys(orders).map(id=>orders[id])
        const [yearStats, montStats] = await Promise.all([
                getYearStats(moment().year()),
                getMonthStats(moment().year(), moment().month()+1)
        ])
        this.setState({
            orders: orderList, 
            pendingOrders,
            yearStats,
            montStats
        })
        document.title = "Pedidos"
        return
    }

    handleOrderDetail = (id) => () =>{
        this.props.history.push('/pedidos/'+id)
    } 

    handleNewOrder = ()=>{
        this.props.history.push('pedidos/nuevo')
    }
    
    hanldleSearch = async (event, value)=>{
        event.preventDefault()
        this.setState({searchResult: []})
        if(!value){
            this.setState({
                loadingSearch: false,
                isSearching: false,
            })
            return
        }
        this.setState({loadingSearch: true})        
        const res = await searchOrder(value)
        console.log(res)
        this.setState({
            loadingSearch: false,
            searchResult: res,
            isSearching: true
        })
        return
    }


    render() {
        const { clients } = this.props
        const { 
            orders, 
            loadingSearch, 
            isSearching, 
            searchResult,
            pendingOrders,
            yearStats,
            montStats
         } = this.state


        return (
            <div>
                <HeaderLayout>
                    <SearchBar 
                        handleAdd={this.handleNewOrder}
                        handleSubmit={this.hanldleSearch}
                    />
                </HeaderLayout>

                {
                    loadingSearch &&
                    <Paper style={{marginBottom: 24}}>
                        <Loader
                            floating
                            loadingText="Buscando Pedidos..."
                            successText=""
                            Icon={SearchIcon}
                            success={false}
                            loading={true} 
                        />
                    </Paper>
                }
                {
                    isSearching && !loadingSearch &&
                    <OrederGrid
                        noOrderTitle="No se encontraron pedidos"
                        noOrderMessage="Intenta cambiando el termino de busqueda o agrega el pedido"
                    >
                        {
                        searchResult.map(order=>{
                            return(
                                <OrderResume
                                    onClick={this.handleOrderDetail(order.id)}
                                    client={clients[order.clientId]}
                                    key={order.id} 
                                    order={order}/>
                            )
                        })
                    }
                    </OrederGrid>
                }


                <StatsCardList style={{marginBottom: 50}}>
                    <StatsCard
                        icon={<AssignmentLateIcon />}
                        title="Pedidos Pendientes"
                        value={pendingOrders.length}
                        secondary="Despacharlos!"
                    />
                    <StatsCard
                        icon={<WidgetsIcon />}
                        title="Pedidos Totales"
                        value={yearStats? (yearStats.totalOrders||0) : 0}
                        secondary={`Año ${moment().year()}`}
                    />
                    <StatsCard
                        icon={<EventIcon />}
                        title="Este Mes"
                        value={montStats? (montStats.totalOrders||0) : 0}
                        secondary={`Mes de ${MONTHS[moment().month()+1]}`}
                    />
                    <StatsCard
                        icon={<AccessibilityNewIcon />}
                        title="Total Prendas"
                        value={yearStats? (yearStats.totalProducts||0) : 0}
                        secondary={`Año ${moment().year()}`}
                    />
                </StatsCardList>
                

                <Section background='#E9E9E9'>
                <Title align="left" primary="Pendientes" secondary="Pedidos pendientes por despacho"/>
                    <OrderSlideList
                        width={360}
                        noItemTitle="No hay pedidos pendientes" 
                        noItemMessage="En el momento no hay pedidos pendientes por despachar">
                    {
                        pendingOrders.map(order=>{
                            return(
                                <OrderResume
                                    onClick={this.handleOrderDetail(order.id)} 
                                    client={clients[order.clientId]}
                                    key={order.id} 
                                    order={order}/>
                            )
                        })
                    }
                    </OrderSlideList> 
                </Section>
       

                <Title align="center" primary="Todos" secondary="Lista de los ultimos pedidos realizados"/>
                <OrederGrid 
                    noOrderTitle="No hay pedidos"
                    noOrderMessage="No se encontraron pedidos, cuando agregues uno, lo veras en esta seccion :)"
                    >
                    {
                        orders.map(order=>{
                            return(
                                <OrderResume
                                    onClick={this.handleOrderDetail(order.id)}
                                    client={clients[order.clientId]}
                                    key={order.id} 
                                    order={order}/>
                            )
                        })
                    }
                </OrederGrid>
        
            
            </div>
        )
    }
}

const mapDispatchToProps={
   
}

function mapStateToProps(state, props){
    return{
        clients: state.clients.all
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pedidos);