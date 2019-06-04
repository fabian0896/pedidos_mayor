import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ClientDetailInfo from './ClientDetailInfo';
import { connect } from 'react-redux'
import { showBackButtom, hideBackButtom, showBackbuttonWithPath } from '../../../actions'
import ClientDetailHeader from './ClientDetailHeader';
import { 
    getClientById, 
    getOrderByClient, 
    getPayments, 
    getAllShipmentsByClientId,
    getOrdersWithBalanceByClientId 
} from '../../../lib/firebaseService'
import OrderSlideList from '../../../componets/orderResume/OrderSlideList';
import OrderResume from '../../../componets/orderResume/OrderResume';
import Section from '../../../componets/section/Section';
import Title from '../../../componets/title/Title';
import PaymentCard from '../../../componets/paymentCard/PaymentCard'
import ShippingCard from '../../../componets/shippingCard/ShippingCard';


const styles = theme => ({

    content: {
        position: 'relative',
        zIndex: 3,
        marginTop: '-80px'
    },
})

class ClientDetail extends Component {

    state = {
        loading: true,
        client: null,
        orders: [],
        payments: [],
        shipments: [],
        unPayOrders: []
    }

    async componentDidMount() {
        this.props.showBackButtom("/clientes")
        const { client, clientId } = this.props
        if (client) {
            const orders = await getOrderByClient(client.id)
            const shipments =  await getAllShipmentsByClientId(client.id)
            this.setState({ loading: false, client, orders, shipments })

        } else {
            this.getClient(clientId)
        }
        const payments = await getPayments(clientId)
        const unPayOrders = await getOrdersWithBalanceByClientId(clientId)
        this.setState({payments, unPayOrders})
        return
    }


    getClient = async (id) => {
        const client = await getClientById(id).catch(err => console.log(err))
        const orders = await getOrderByClient(client.id)
        const shipments =  await getAllShipmentsByClientId(client.id)
        
        this.setState({ loading: false, client, orders, shipments })
        document.title = "Clientes | " + client.name
        return
    }

    componentWillUnmount() {
        this.props.hideBackButtom()
    }


    handleEdit = (client) => () => {
        const from = this.props.location.pathname
        //const { clientId } = this.props
        this.props.history.push({
            pathname: '/clientes/nuevo',
            state: {
                from,
                clientId: client.id
            }
        })
    }

    handleOrderDetail=(id)=>()=>{
        this.props.history.push('/pedidos/'+id)
    }

    render() {
        const { classes, sellers } = this.props
        const { loading, client, orders, payments, shipments } = this.state
        const orderList = Object.keys(orders).map(id=>orders[id])
        return (
            <div>
                {
                    (!client && !loading) &&
                    <div>
                        El Cliente no existe :(
                    </div>
                }
                {
                    (client && !loading) &&
                    <Fragment>
                        <ClientDetailHeader handleEdit={this.handleEdit(client)} client={client} />
                        <div className={classes.content}>
                            <ClientDetailInfo unPayOrders={this.state.unPayOrders} client={{...client, seller: sellers[client.seller]}} />
                        </div>
                        <Section background='#E9E9E9'>
                        <Title align="center" primary="Pedidos" secondary="Todos los pedidos del cliente"/>
                            <OrderSlideList 
                                noItemTitle="No hay pedidos"
                                noItemMessage="El cliente no tiene pedidos aun, ve a la seccion de pedidos para agrarlos ;)" >
                            {
                                orderList.map(order=>{
                                    return(
                                        <OrderResume
                                            onClick={this.handleOrderDetail(order.id)} 
                                            client={client}
                                            width={365} 
                                            key={order.id} 
                                            order={order}/>
                                    )
                                })
                            }
                            </OrderSlideList>
                        </Section>

                        <Title align="right" primary="Pagos" secondary="Todos los pagos del cliente" />
                        <OrderSlideList
                            width={350}
                            noItemTitle="No se han realizado pagos"
                            noItemMessage="El cliente no ha realizado ningun pago aun" >
                                {
                                    payments.map(payment=>(
                                        <PaymentCard key={payment.id} payment={payment} />
                                    ))
                                }
                        </OrderSlideList>
                        
                        <Section background='#E9E9E9'>
                            <Title  align="left" primary="envios" secondary="Todos los envios del cliente" />
                            <OrderSlideList
                                width={280}
                                noItemTitle="No se han realizado envios"
                                noItemMessage="El cliente no ha realizado ningun envio aun" >
                                    {
                                        shipments.map(shipping=>(
                                            <ShippingCard key={shipping.id} shipping={shipping} />
                                        ))
                                    }
                            </OrderSlideList>
                        </Section>
                    </Fragment>
                }
            </div>
        )
    }
}

const mapDispatchToProps = {
    showBackButtom,
    hideBackButtom,
    showBackbuttonWithPath: showBackbuttonWithPath('/clientes')
}

function mapStateToProps(state, props) {
    const id = props.match.params.id

    return {
        client: state.clients.all[id],
        clientId: id,
        sellers: state.sellers
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ClientDetail));