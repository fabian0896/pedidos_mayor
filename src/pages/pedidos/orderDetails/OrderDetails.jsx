import React, {Component, Fragment} from 'react'
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
import { getOrderbyId, getClientById } from '../../../lib/firebaseService'
import {connect} from 'react-redux'
import { showBackButtom, hideBackButtom } from '../../../actions'
import TimeLine from '../../../componets/timeLine/TimeLine'


class OrderDetails extends Component{
    
    state={
        products: [],
        client: {},
        order: {},
        noRender: true,
        loading: true
    }

    async componentDidMount(){
        this.props.showBackButtom()
        //document.title = 'Pedidos | A0042'
        
        const id = this.props.match.params.id
        let client = null
        const clientId = await this.getOrder(id)
        if(clientId){
            client = await this.getClient(clientId)
        }
        this.setState({noRender: false, loading: false, client})
        return
    }

    getOrder = async (id) => {
        let exist = true
        const order = await getOrderbyId(id).catch(err=>{
            exist = false
        })
        if(!exist){
            console.log('el pedido no existe')
            return
        }
        this.setState({order, products: order.products})
        return order.clientId
    }

    getClient = async (id) =>{
        const client = this.props.clients[id]
        if(client){
            return client
        }
        const fetchClient = await getClientById(id)
        return fetchClient
    }

    handleEdit = ()=>{
        const { order } = this.state
        this.props.history.push({
            pathname: '/pedidos/nuevo',
            state:{
                order
            }
        })
    }


    componentWillUnmount(){
        this.props.hideBackButtom()
    }

    render(){
        const { width } = this.props
        const { products, client, noRender, order } = this.state
        return(
            <div>
                {
                    !noRender &&
                    <Fragment>
                        <HeaderLayout
                            auxButton
                            onClick={this.handleEdit}
                            buttonTitle="Editar"
                        >
                            <Typography color="inherit" component="h2" variant="h1">{order.serialCode}</Typography>
                        </HeaderLayout>
                        {
                            width === 'xs' || width === 'sm'?
                            <Fragment>
                                <OrderDetailCard
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

                                <Grid container spacing={16}>
                                    <Grid item sm={6} xs={12}>
                                        <ShippingInfoCard data={order.shipping} />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <PaymentSummary/>
                                    </Grid>
                                </Grid>
                            </Fragment>
                            : 
                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={12} md={9}>
                                    <OrderProductTable
                                        withDetails
                                        withTotal
                                        currency={order.currency}
                                        order={order}
                                        data={products} />
                                    <TimeLine 
                                        data={order.timeLine}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={3}>
                                    <OrderDetailCard
                                        order={order}
                                        client={client}
                                    />
                                    <PaymentSummary/>
                                    <ShippingInfoCard data={order.shipping} />
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

function mapStateToProps(state, props){
    return{
        clients: state.clients.all
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(OrderDetails))