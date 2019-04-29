import React,{Component} from 'react'
import MyModal from '../../componets/myModal/MyModal';
import PaymentForm from './PaymentForm';
import { getOrdersWithBalance, addPayment } from '../../lib/firebaseService'


class AddPaymentModal extends Component{

    state={
        allOrders: [],
        optionsOrders: [],
        noRender: true
    }

    handleSubmit = async (values) =>{
        console.log(values)
        await addPayment(values)
        console.log("se agregoooooo!")
        return
    }


    async componentDidMount(){
        const orders = await getOrdersWithBalance()
        const optionsOrders = Object.keys(orders).map(id=>{
            return{
                label: orders[id].serialCode,
                value: id
            }
        })
        this.setState({noRender: false, optionsOrders, allOrders: orders})
    }

    render(){
        const { open, onClose } = this.props
        const { noRender, optionsOrders } = this.state
        return(
        <MyModal
            open={open}
            onClose={onClose}
            title="Agregar Pago"
        >
        {
            !noRender &&
            <PaymentForm
                handleSubmit={this.handleSubmit} 
                options={optionsOrders}
            />
        }
        </MyModal>
        )
    }
}




export default AddPaymentModal