import React from 'react'
import Header from '../../../componets/headerLayout/HeaderLayout'
import { Typography } from '@material-ui/core';
import MyStepper from '../../../componets/mystepper/MyStepper';
import MyStep from '../../../componets/mystepper/MyStep';
import ClientForm from './ClientForm';
import { getPendingOrders } from '../../../lib/firebaseService'
import { connect } from 'react-redux'
import ProductsShippingForm from './ProductsShippingForm';
import ShippingForm from '../../pedidos/newOrder/ShippingForm'
import ShippingResume from './ShippingResume';



class NewShipping extends React.Component{

    state={
        activeStep: 0,
        options: [],
        formValues: {
            shipping:{}
        }
    }

    submit = Array(5).fill(null)

     async componentDidMount(){
        const options = await this.getOrderOptions()
        this.setState({options})
    }

    getOrderOptions = async ()=>{
        const orders =  await getPendingOrders()
        
        return orders.map(order=>({
            label: order.serialCode,
            value: order.id,
            id: order.id,
            secondary: this.props.clients[order.clientId].name,
            pendingProducts: order.totalProducts - (order.shippedProducts || 0),
            country: this.props.clients[order.clientId].country.translations.es || this.props.clients[order.clientId].country.name,
            city: this.props.clients[order.clientId].city,
            shipping: order.shipping
        }))
    }

    getSubmitRef = (step) => (submitRef)=>{
        this.submit[step] = submitRef
    }

    handleSubmit= (values, actions)=>{   
        console.log(values)
        const { activeStep } = this.state

        if(activeStep === 0){
            this.setState(state=>({
                formValues:{
                    ...state.formValues,
                    ...values,
                    shipping: values.order.shipping,
                }
            }))
        }else{
            this.setState(state=>({
                formValues: {
                    ...state.formValues,
                    ...values
                }
            }))
        }
        

        this.setState(state=>({
            activeStep: state.activeStep + 1
        }))
    }

    handleBack = ()=>{
        this.setState(state=>({activeStep: state.activeStep - 1}))
    }

    handleNext = ()=>{
        this.submit[this.state.activeStep]()
    }

    handleComplete = () => {
        console.log("Completado!")
    }

    render(props){ 
       const { options, activeStep, formValues } = this.state
        return(
            <div>
                <Header>
                    <Typography color="inherit" component="h2" variant="h2">Nuevo Envio</Typography>
                </Header>
                <MyStepper
                    activeStep={activeStep}
                    handleNext={this.handleNext}
                    handleBack={this.handleBack}>
                    <MyStep title="Pedido">
                        <ClientForm
                            initialvalues={this.state.formValues}
                            getSubmitRef={this.getSubmitRef(0)}
                            handleSubmit={this.handleSubmit} 
                            options={options} />
                    </MyStep>
                    <MyStep title="Datos de Envio">
                        <ShippingForm
                            required
                            handleSubmit={this.handleSubmit}
                            saveSubmitRef={this.getSubmitRef(1)}
                            iniValues={formValues.shipping}/>
                    </MyStep>
                    <MyStep title="Unidad de Empaque">
                        <ProductsShippingForm
                            initialvalues={formValues}
                            getSubmitRef={this.getSubmitRef(2)}
                            handleSubmit={this.handleSubmit}  
                            order={formValues.order}/>
                    </MyStep>
                    <MyStep
                        onFinish={this.handleComplete} 
                        title="Resumen">
                        <ShippingResume shipping={formValues}/>
                    </MyStep>
                </MyStepper>
            </div>
        )
    }
}



function mapStateToProps(state, props){
    return{
        clients: state.clients.all
    }
}


export default connect(mapStateToProps)(NewShipping)