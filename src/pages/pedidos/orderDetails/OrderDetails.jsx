import React, { Component, Fragment } from 'react'
import {
    Grid,
    Typography,
    withWidth,
} from '@material-ui/core'
import HeaderLayout from '../../../componets/headerLayout/HeaderLayout';
import OrderDetailCard from './OrderDetailCard';
import ShippingInfoCard from './ShippingInfoCard';
import PaymentSummary from './PaymentSummary'
import OrderProductTable from './OrderProductTable';
import { getOrderbyId, getClientById, getPaymentsByOrderId } from '../../../lib/firebaseService'
import { connect } from 'react-redux'
import { showBackButtom, hideBackButtom } from '../../../actions'
import TimeLine from '../../../componets/timeLine/TimeLine'
import OrderSlideList from '../../../componets/orderResume/OrderSlideList'
import PaymentCard from '../../../componets/paymentCard/PaymentCard'
import Title from '../../../componets/title/Title'
import ShippingCard from '../../../componets/shippingCard/ShippingCard';
import AddPaymentModal from '../../pagos/AddPaymentModal';

class OrderDetails extends Component {

    state = {
        products: [],
        client: {},
        order: {},
        noRender: true,
        loading: true,
        payments: [],
        openPayModal: false
    }

    async componentDidMount() {
        this.props.showBackButtom()
        const id = this.props.match.params.id
        let client = null
        const [clientId, currentOrder] = await this.getOrder(id)
        document.title = `Pedido | ${currentOrder.serialCode}`
        if (clientId) {
            client = await this.getClient(clientId)
        }
        await this.getPayments(id)
        this.setState({ noRender: false, loading: false, client })
        return
    }

    handleUpdate = async () =>{
        const id = this.props.match.params.id
        await this.getOrder(id)
        await this.getPayments(id)
    }

    getPayments = async (id) => {
        const payments = await getPaymentsByOrderId(id)
        this.setState({ payments })
    }

    getOrder = async (id) => {
        let exist = true
        const order = await getOrderbyId(id).catch(err => {
            exist = false
        })
        if (!exist) {
            console.log('el pedido no existe')
            return
        }
        this.setState({ order, products: order.products })
        return [order.clientId, order]
    }

    getClient = async (id) => {
        const client = this.props.clients[id]
        if (client) {
            return client
        }
        const fetchClient = await getClientById(id)
        return fetchClient
    }

    handleEdit = () => {
        const { order } = this.state
        this.props.history.push({
            pathname: '/pedidos/nuevo',
            state: {
                order
            }
        })
    }

    componentDidUpdate(prevProps){
        const id = this.props.match.params.id
        const oldId = prevProps.match.params.id
        if(oldId !== id){
            this.componentDidMount()
        }
    }

    componentWillUnmount() {
        this.props.hideBackButtom()
    }

    handleOpenPayModal = ()=>{
        this.setState({openPayModal: true})
    }

    hanldeClosePayModal = ()=>{
        this.setState({openPayModal: false})
        this.handleUpdate()
    }

    handleAddShipping = ()=>{
        this.props.history.push("/envios/nuevo")
    }

    render() {
        const { width } = this.props
        const { products, client, noRender, order, payments, openPayModal } = this.state
        const shippingList = order.shipments || []
        return (
            <div>
                {
                    !noRender &&
                    <Fragment>
                        <AddPaymentModal
                            order={order}
                            open={openPayModal}
                            onClose={this.hanldeClosePayModal} 
                            title="Agregar Pago"          
                        />
                        <HeaderLayout
                            auxButton
                            onClick={this.handleEdit}
                            buttonTitle="Editar"
                        >
                            <Typography color="inherit" component="h2" variant="h1">{order.serialCode}</Typography>
                        </HeaderLayout>
                        {
                            width === 'xs' || width === 'sm' ?
                                <Fragment>
                                    
                                    <OrderDetailCard
                                        onUpdate={this.handleUpdate}
                                        order={order}
                                        client={client}
                                    />

                                    <OrderProductTable
                                        withDetails
                                        withTotal
                                        currency={order.currency}
                                        order={order}
                                        data={products} />

                                    <TimeLine
                                        data={order.timeLine}
                                    />

                                    <Title style={{ marginTop: 8 * 4 }} align="right" primary="Pagos" secondary="Pagos Realizados en este pedido" />
                                    <OrderSlideList
                                        width={350}
                                        noItemTitle="No se han realizado pagos"
                                        noItemMessage="Este Pedido no tiene pagos realizados" >
                                        {
                                            payments.map(payment => (
                                                <PaymentCard
                                                    onUpdate={this.handleUpdate} 
                                                    key={payment.id} 
                                                    payment={payment} />
                                            ))
                                        }
                                    </OrderSlideList>


                                    <Title style={{ marginTop: 8 * 4 }} align="left" primary="Envios" secondary="Envios realizados de este pedido" />
                                    <OrderSlideList
                                        width={280}
                                        noItemTitle="No se han realizado envios"
                                        noItemMessage="Este pedido no tiene envios realizados" >
                                        {
                                            shippingList.map((shipping, index) => (
                                                <ShippingCard
                                                    onUpdate={this.handleUpdate} 
                                                    key={index} 
                                                    width={280} 
                                                    shipping={shipping} />
                                            ))
                                        }
                                    </OrderSlideList>


                                    <Grid style={{marginTop: 24}} container spacing={16}>
                                        <Grid item sm={6} xs={12}>
                                            <ShippingInfoCard handleAddShipping={this.handleAddShipping} data={order} />
                                        </Grid>
                                        <Grid item sm={6} xs={12}>
                                            <PaymentSummary handleAddPayment={this.handleOpenPayModal} data={order} />
                                        </Grid>
                                    </Grid>
                                </Fragment>
                                :
                                <Grid container spacing={24}>
                                    <Grid item xs={12}>
                                        <OrderProductTable
                                            withDetails
                                            withTotal
                                            currency={order.currency}
                                            order={order}
                                            data={products} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={9}>

                                        <TimeLine
                                            data={order.timeLine}
                                        />

                                        <Title style={{ marginTop: 8 * 4 }} align="right" primary="Pagos" secondary="Pagos Realizados en este pedido" />
                                        <OrderSlideList
                                            width={350}
                                            noItemTitle="No se han realizado pagos"
                                            noItemMessage="Este Pedido no tiene pagos realizados" >
                                            {
                                                payments.map(payment => (
                                                    <PaymentCard
                                                        onUpdate={this.handleUpdate} 
                                                        key={payment.id} 
                                                        payment={payment} />
                                                ))
                                            }
                                        </OrderSlideList>


                                        <Title style={{ marginTop: 8 * 4 }} align="left" primary="Envios" secondary="Envios realizados de este pedido" />
                                        <OrderSlideList
                                            width={280}
                                            noItemTitle="No se han realizado envios"
                                            noItemMessage="Este pedido no tiene envios realizados" >
                                            {
                                                shippingList.map((shipping, index) => (
                                                    <ShippingCard
                                                        onUpdate={this.handleUpdate} 
                                                        key={index} 
                                                        width={280} 
                                                        shipping={shipping} />
                                                ))
                                            }
                                        </OrderSlideList>


                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <OrderDetailCard
                                            onUpdate={this.handleUpdate}
                                            order={order}
                                            client={client}
                                        />
                                        <PaymentSummary handleAddPayment={this.handleOpenPayModal} data={order} />
                                        <ShippingInfoCard handleAddShipping={this.handleAddShipping} data={order} />
                                    </Grid>
                                </Grid>
                        }
                    </Fragment>
                }
            </div>
        )
    }
}

const mapDispatchToProps = {
    showBackButtom,
    hideBackButtom
}

function mapStateToProps(state, props) {
    return {
        clients: state.clients.all
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(OrderDetails))