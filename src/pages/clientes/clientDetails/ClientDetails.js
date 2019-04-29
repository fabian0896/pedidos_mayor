import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ClientDetailInfo from './ClientDetailInfo';
import { connect } from 'react-redux'
import { showBackButtom, hideBackButtom, showBackbuttonWithPath } from '../../../actions'
import ClientDetailHeader from './ClientDetailHeader';
import { getClientById, getOrderByClient } from '../../../lib/firebaseService'
import OrderSlideList from '../../../componets/orderResume/OrderSlideList';
import OrderResume from '../../../componets/orderResume/OrderResume';
import Section from '../../../componets/section/Section';
import Title from '../../../componets/title/Title';


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
        orders: []
    }

    async componentDidMount() {
        this.props.showBackButtom("/clientes")
        const { client, clientId } = this.props
        if (client) {
            const orders = await getOrderByClient(client.id)
            this.setState({ loading: false, client, orders })

        } else {
            this.getClient(clientId)
        }
        return
    }


    getClient = async (id) => {
        const client = await getClientById(id).catch(err => console.log(err))
        const orders = await getOrderByClient(client.id)
        this.setState({ loading: false, client, orders })
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
        const { loading, client, orders } = this.state
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
                            <ClientDetailInfo client={{...client, seller: sellers[client.seller]}} />
                        </div>
                        <Section background='#E9E9E9'>
                        <Title align="center" primary="Pedidos" secondary="Todos los pedidos del cliente"/>
                            <OrderSlideList title="Pedidos">
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