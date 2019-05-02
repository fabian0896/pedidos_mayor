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
import { getAllOrders } from '../../lib/firebaseService'

import Title from '../../componets/title/Title'
import { searchOrder } from '../../lib/searchService'
import { Paper } from '@material-ui/core';
import Loader from '../../componets/loader/Loader';
import { Search as SearchIcon } from '@material-ui/icons'



class Pedidos extends Component {
    
    state = {
        noRender: true,
        orders: [],
        isSearching: false,
        searchResult: [],
        loadingSearch: false
    }

    async componentDidMount(){
        const orders = await getAllOrders()
        const orderList = Object.keys(orders).map(id=>orders[id])
        this.setState({orders: orderList})
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
        const { orders, loadingSearch, isSearching, searchResult } = this.state
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
                        value="10"
                        secondary="Despacharlos!"
                    />
                    <StatsCard
                        icon={<WidgetsIcon />}
                        title="Pedidos Totales"
                        value="139"
                        secondary="30 por mes"
                    />
                    <StatsCard
                        icon={<EventIcon />}
                        title="Este Mes"
                        value="34"
                        secondary="4 nuevos hoy"
                    />
                    <StatsCard
                        icon={<AccessibilityNewIcon />}
                        title="Total Prendas"
                        value="4093"
                        secondary="40 por pedido"
                    />
                </StatsCardList>
                

                <Section background='#E9E9E9'>
                <Title align="left" primary="Pendientes" secondary="Pedidos pendientes por despacho"/>
                    <OrderSlideList
                        noItemTitle="No hay pedidos pendientes" 
                        noItemMessage="En el momento no hay pedidos pendientes por despachar">
                    {
                        orders.map(order=>{
                            return(
                                <OrderResume
                                    onClick={this.handleOrderDetail(order.id)} 
                                    client={clients[order.clientId]}
                                    width={360} 
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