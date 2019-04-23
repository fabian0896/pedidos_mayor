import React, { Component } from 'react';
import HeaderLayout from '../../componets/headerLayout/HeaderLayout'
import StatsCard from '../../componets/statsCard/StatsCard';
import {
    Widgets as WidgetsIcon,
    Event as EventIcon,
    AssignmentLate as AssignmentLateIcon,
    AccessibilityNew as AccessibilityNewIcon
} from '@material-ui/icons'
import StatsCardList from '../../componets/statsCard/StatsCardList';
import OrderResume from '../../componets/orderResume/OrderResume';
import SearchBar from '../../componets/searchBar/SearchBar';
import OrederGrid from '../../componets/orderResume/OrderGrid';
import Section from '../../componets/section/Section';
import OrderSlideList from '../../componets/orderResume/OrderSlideList';
import {connect } from 'react-redux'
import { getAllOrders } from '../../lib/firebaseService'



class Pedidos extends Component {
    
    state = {
        noRender: true,
        orders: []
    }

    async componentDidMount(){
        const orders = await getAllOrders()
        const orderList = Object.keys(orders).map(id=>orders[id])
        this.setState({orders: orderList})
        return
    }

    handleOrderDetail = (id) => () =>{
        this.props.history.push('/pedidos/'+id)
    } 

    handleNewOrder = ()=>{
        this.props.history.push('pedidos/nuevo')
    }
    
    render() {
        const { clients } = this.props
        const { orders } = this.state
        return (
            <div>
                <HeaderLayout>
                    <SearchBar 
                        handleAdd={this.handleNewOrder}
                    />
                </HeaderLayout>

                
                <StatsCardList style={{marginBottom: 50}}>
                    <StatsCard
                        icon={<AssignmentLateIcon />}
                        title="Pedidos Pendientes"
                        value="10"
                    />
                    <StatsCard
                        icon={<WidgetsIcon />}
                        title="Pedidos Totales"
                        value="139"
                    />
                    <StatsCard
                        icon={<EventIcon />}
                        title="Este Mes"
                        value="34"
                    />
                    <StatsCard
                        icon={<AccessibilityNewIcon />}
                        title="Total Prendas"
                        value="4093"
                    />
                </StatsCardList>
                

                <Section background='#E9E9E9'>
                    <OrderSlideList title="Pendientes">
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
       

                <OrederGrid title="Pedidos">
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