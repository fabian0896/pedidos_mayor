import React,{Component, Fragment} from 'react'
import MyModal from '../../componets/myModal/MyModal';
import PaymentForm from './PaymentForm';
import { getOrdersWithBalance, addPayment } from '../../lib/firebaseService'
import {connect} from 'react-redux'
import Loader from '../../componets/loader/Loader'
import {Save as SaveIcon } from '@material-ui/icons'
import { getPayments } from '../../lib/firebaseService'



class AddPaymentModal extends Component{

    state={
        allOrders: [],
        optionsOrders: [],
        noRender: true,
        loading: false,
        success: false,
        loadingModal: false
    }

    handleSubmit = async (values) =>{
        this.setState({loading: true, success: false, loadingModal: true})
        await addPayment(values)
        this.setState({success: true, loadingModal: false})
        const payment = await getPayments()
        await this.updateOptions()
        setTimeout(()=>{
            this.setState({loading: false, success: false}, ()=>{
                this.props.onClose(null,null, payment)
            })
        }, 700)
        return
    }



    async componentDidMount(){
        await this.updateOptions()
        this.setState({noRender: false})
        return
    }

    updateOptions = async () => {
        const orders = await getOrdersWithBalance()
        const optionsOrders = Object.keys(orders).map(id=>{
            return{
                label: orders[id].serialCode,
                value: id,
                balance: orders[id].balance,
                currency: orders[id].currency,
                secondary: this.props.clients[orders[id].clientId].name
            }
        })
        this.setState({optionsOrders, allOrders: orders})
        return
    }

    render(){
        const { open, onClose, order } = this.props
        const { noRender, optionsOrders, loading, success, loadingModal } = this.state
        return(
        <MyModal
            open={open}
            onClose={onClose}
            title="Agregar Pago"
        >
        {
            !noRender &&
            <Fragment>
                {
                    !loading?
                    <PaymentForm
                        onClose={onClose}
                        order={order}
                        handleSubmit={this.handleSubmit} 
                        options={optionsOrders}
                    />
                    :
                    <Loader
                        floating 
                        loadingText="Añadiendo pago al sistema"
                        successText="el pago fue añadido correctamente"
                        Icon={SaveIcon}
                        success={success}
                        loading={loadingModal}
                    />
                }

            </Fragment>
        }
        </MyModal>
        )
    }
}

function mapStateToProps(state){
    return{
        clients: state.clients.all
    }
}


export default connect(mapStateToProps)(AddPaymentModal)