import React, { Component } from 'react'
import HeaderLayout from '../../../componets/headerLayout/HeaderLayout';
import { Typography } from '@material-ui/core';
import MyStepper from '../../../componets/mystepper/MyStepper';
import MyStep from '../../../componets/mystepper/MyStep';
import ClientForm from './ClientForm';
import { connect } from 'react-redux'
import { showBackButtom, hideBackButtom, addAllProducts } from '../../../actions'
import ShippingForm from './ShippingForm';
import ProductsForm from './ProductsForm'
import DiscountForm from './DiscountForm';
import OrderResume from './OrderResume';
import { addOrder } from '../../../lib/firebaseService'






class NewOrder extends Component{


    state ={
        activeStep: 0,
        formValues:{
            shipping:{}
        }
    }

    submit = Array(4).fill(null)

    componentDidMount(){
        this.props.addAllProducts()
        this.props.showBackButtom()
        
    }

    componentWillUnmount(){
        
        this.props.hideBackButtom()
    }

    saveSubmitRef = (index) => (submitRef)=>{
        this.submit[index] = submitRef
    }

    handleSubmit = (values, actions)=>{
        const {activeStep} = this.state
        if(activeStep === 0){
            this.setClientShppingInfo(values.client.value, values)
        }else if(activeStep ===1){
            this.setState(state=>({
                formValues:{
                    ...state.formValues,
                    shipping:{
                        ...state.formValues.shipping,
                        ...values
                    }
                }
            }))
        }else{
            this.setState(({formValues}) =>({
                formValues: {...formValues, ...values}
            }))
        }
        this.nextStep()
    }

    setClientShppingInfo = (id, values={})=>{
        const { clients: allClients } = this.props
        const actualClient = allClients[id]
            this.setState(state=>({
                formValues:{
                    ...state.formValues,
                    ...values,
                    clientInfo: actualClient,
                    shipping:{
                        name: actualClient.name,
                        country: actualClient.country.translations.es || actualClient.country.name,
                        city: actualClient.city,
                        address: actualClient.address,
                        zipCode: actualClient.zipCode,
                        phone: actualClient.phone,
                        email: actualClient.email
                    }
                }
            }))
    }


    handleNext = ()=>{
        const {activeStep} = this.state
        this.submit[activeStep]()
    }

    nextStep = ()=>{
        this.setState(({activeStep})=>({
            activeStep: activeStep + 1
        }))
    }

    handleBack = ()=>{
        this.setState(({activeStep})=>({
            activeStep: activeStep - 1
        }))
    }

    handleComplete = ()=>{
        console.log('completed!')
    }

    handleSave = ()=>{
        const { formValues } = this.state
        addOrder(formValues)
            .then(()=>console.log("listo"))
            .catch((err)=>console.log(err))
    }


    render(){
        const { clientsList, products } = this.props
        const { activeStep, formValues } = this.state
        return(
            <div>
                <HeaderLayout>
                    <Typography component="h2" variant="h2" color="inherit">Nuevo Pedido</Typography>
                </HeaderLayout>
                <MyStepper
                    activeStep={activeStep}
                    handleNext={this.handleNext}
                    handleBack={this.handleBack}
                    onComplete={this.handleComplete}
                    >
                    <MyStep title="Clinete">
                        <ClientForm
                            handleSubmit={this.handleSubmit}
                            saveSubmitRef={this.saveSubmitRef(0)} 
                            options={clientsList}
                            iniValues={formValues}
                            />
                    </MyStep>
                    <MyStep title="Envio">
                        <ShippingForm
                            handleSubmit={this.handleSubmit}
                            saveSubmitRef={this.saveSubmitRef(1)}
                            iniValues={formValues.shipping}/>
                    </MyStep>
                    <MyStep title="Prendas">
                        <ProductsForm
                            currency={formValues.currency}
                            initialValues={formValues.products}
                            handleSubmit={this.handleSubmit}
                            saveSubmitRef={this.saveSubmitRef(2)} 
                            customPrices={{'6RlzAuoMKsCqyMEVoCtn':{cop: 84000}}} 
                            allProducts={products}/>
                    </MyStep>
                    <MyStep title="Cobro">
                        <DiscountForm
                            handleSubmit={this.handleSubmit}
                            saveSubmitRef={this.saveSubmitRef(3)}
                            initialValues={formValues}
                         />
                    </MyStep>
                    <MyStep onFinish={this.handleSave} title="Resumen">
                        <OrderResume currency={formValues.currency} data={formValues} />
                    </MyStep>
                </MyStepper>
            </div>
        )
    }
}

const mapDispatchToProps ={
    showBackButtom,
    hideBackButtom,
    addAllProducts
}

function mapStateToProps(state, props){
    
    const clients = state.clients.all
    const clientsList = Object.keys(clients).map(id =>{
        return{
            label: clients[id].name,
            value: clients[id].id
        }
    })

    return{
        clientsList,
        clients,
        products: state.products.all
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (NewOrder)