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
        if(values.client ){
            this.setClientShppingInfo(values.client.value)
        }
        this.setState(({formValues}) =>({
            formValues: {...formValues, ...values}
        }))
        this.nextStep()
    }

    setClientShppingInfo = (id)=>{
        const { clients: allClients } = this.props
        const actualClient = allClients[id]
            this.setState(state=>({
                formValues:{
                    ...state.formValues,
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
                        <ProductsForm customPrices={{'6RlzAuoMKsCqyMEVoCtn':{cop: 84000}}} allProducts={products}/>
                    </MyStep>
                    <MyStep title="Cobro">

                    </MyStep>
                    <MyStep title="Resumen">

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