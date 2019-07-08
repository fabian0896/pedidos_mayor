import React, { Component } from 'react';
import Header from '../../componets/headerLayout/HeaderLayout'
import { Typography, Grid } from '@material-ui/core';
import Frases from '../../componets/frases/Frases'
import Title from '../../componets/title/Title'
import { 
    getReadyToShipOrders, 
    getLastPayments, 
    getLastShipments,
    getOrdersWithBalance 
} from '../../lib/firebaseService'
import OrderResume from '../../componets/orderResume/OrderResume'
import OrderSlideList from '../../componets/orderResume/OrderSlideList'
import { connect } from 'react-redux'
import PaymentCard from '../../componets/paymentCard/PaymentCard'
import ShippingCard from '../../componets/shippingCard/ShippingCard'
import OrderWithBalance from './OrderWithBalance'
import WeekStats from '../../componets/weekStats/WeekStats'
import moment from 'moment'
import { getYearStats } from '../../lib/statsService'


class Home extends Component {

    state = {
        orders: [],
        payments: [],
        shipments: [],
        orderWithBalance:[]
    }

    async componentDidMount() {

        document.title = "Inicio | Pedidos Bethel"
        const [orders, payments, shipments, orderWithBalance, year] = await Promise.all([
            getReadyToShipOrders(),
            getLastPayments(),
            getLastShipments(),
            getOrdersWithBalance(true),
            getYearStats(moment().year())
        ])
        this.setState({ orders, payments, shipments, orderWithBalance, year })
        return
    }

    handleOrderDetail = (id) => () => {
        this.props.history.push(`pedidos/${id}`)
    }

    componentWillUnmount() {

    }

    render() {

        const { orders, payments, shipments, orderWithBalance, year} = this.state
        const { clients } = this.props


        return (
            <div >
                <Header>
                    <Typography variant="h1" color="inherit">Inicio</Typography>
                </Header>
                <Frases />
                <WeekStats year={year}/>
                <Grid style={{marginTop: 40}} container spacing={16}>
                    <Grid item xs={12} md={9}>
                        <Title align="center" primary="Despacho Hoy" secondary="Pedidos Listo para despachar" />
                        <OrderSlideList
                            noItemTitle="No hay pedidos Pendientes"
                            noItemMessage="En el momento no hay pedidos pendientes por despachar :)" >
                            {
                                orders.map(order => {
                                    return (
                                        <OrderResume
                                            onClick={this.handleOrderDetail(order.id)}
                                            client={clients[order.clientId]}
                                            key={order.id}
                                            order={order} />
                                    )
                                })
                            }
                        </OrderSlideList>


                        <Title style={{marginTop: 40}} align="left" primary="Pagos" secondary="Ultimos pagos realizados" />
                        <OrderSlideList
                            width={350}
                            noItemTitle="No se han realizado envios"
                            noItemMessage="El cliente no ha realizado ningun envio aun" >
                            {
                                payments.map(payment => (
                                    <PaymentCard key={payment.id} payment={payment} />
                                ))
                            }
                        </OrderSlideList>


                        <Title style={{marginTop: 40}} align="right" primary="Envios" secondary="Ultimos envios realizados" />
                        <OrderSlideList
                            width={280}
                            noItemTitle="No se han realizado envios"
                            noItemMessage="Por el momento no se encuentra ningun envio en el sistema" >
                            {
                                shipments.map(shipping => (
                                    <ShippingCard key={shipping.id} shipping={shipping} />
                                ))
                            }
                        </OrderSlideList>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <OrderWithBalance data={orderWithBalance} />
                    </Grid>
                </Grid>

            </div>
        )
    }
}


function mapStateToProps(state, props) {
    return {
        clients: state.clients.all
    }
}

export default connect(mapStateToProps)(Home);