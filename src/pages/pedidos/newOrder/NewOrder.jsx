import React, { Component, Fragment } from 'react'
import HeaderLayout from '../../../componets/headerLayout/HeaderLayout';
import { Typography, withWidth } from '@material-ui/core';
import MyStepper from '../../../componets/mystepper/MyStepper';
import MyStep from '../../../componets/mystepper/MyStep';
import ClientForm from './ClientForm';
import { connect } from 'react-redux'
import { showBackButtom, hideBackButtom, addAllProducts, getAllOrders} from '../../../actions'
import ShippingForm from './ShippingForm';
import ProductsForm from './ProductsForm'
import DiscountForm from './DiscountForm';
import OrderResume from './OrderResume';
import { addOrder, updateOrder } from '../../../lib/firebaseService'
import Loader from '../../../componets/loader/Loader';
import { Save as SaveIcon } from '@material-ui/icons'
import MyMobileStepper from '../../../componets/myMobileStepper/MyMobileStepper';
import MyMobileStep from '../../../componets/myMobileStepper/MyMobileStep'






class NewOrder extends Component{


    state ={
        activeStep: 0,
        formValues:{
            shipping:{}
        },
        loading: false,
        loadingText: '',
        successText: '',
        Icon: null,
        success: false,
        saving: false,
        noRender: true,
        isEditing: false
    }

    submit = Array(4).fill(null)

    componentDidMount(){
        this.props.addAllProducts()
        this.props.showBackButtom()
        const routerState = this.props.location.state || {}
        if(routerState.order){
            // se viene desde una edicion de pedido
            this.setOrderInfoForEdit(routerState.order)
        }else if(routerState.clientId){
            // se viene desde "agregar pedido" en un client
            
            this.setClientInForm(routerState.clientId, ()=>{
                this.setState({noRender: false})
            })
        } else{
            this.setState({noRender: false})
        }
        return
    }

    
    setOrderInfoForEdit = (order) => {
        const clientOption = this.props.clientsList.find(client=> client.value === order.clientId)
        this.setState(state =>({
            formValues: {...order,client: clientOption},
            noRender: false,
            isEditing: true
        }))
    }


    setClientInForm = (id, cb)=>{
        const actualClient = this.props.clients[id]
        if(!actualClient){
            cb && cb()
            return
        }
        this.setClientShppingInfo(id)
        const clientOption = this.props.clientsList.find(client=> client.value === actualClient.id)
        this.setState(state=>({
            activeStep: 0,
            formValues:{
                ...state.formValues,
                client: clientOption,
                currency: actualClient.currency || 'USD'
            }
        }),()=> {cb && cb()})
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

    handleSave = async ()=>{
        const { formValues, isEditing } = this.state
        const loadingMessage = isEditing? 'Se esta modificando el pedido' : 'Se esta agregando el pedido'
        const successMessage = isEditing? 'El pedido se modifico correctamente' : 'El pedido se agrego correctamente'

        this.setState({
            saving: true,
            loading: true,
            success: false,
            Icon: SaveIcon,
            loadingText: loadingMessage,
            successText: successMessage
        })

        if(isEditing){
            await updateOrder(formValues, formValues.id)
        }else{
            await addOrder(formValues)
        }

        this.setState({ success: true, loading: false })
        setTimeout(()=>{
            const route = isEditing? `/pedidos/${formValues.id}`: '/pedidos'
            this.props.history.push(route)
        }, 700)
        return 
    }

    handleGoBack=()=>{
        this.props.history.goBack()
    }

    render(){
        const { clientsList, products, width } = this.props
        const { 
            activeStep, 
            formValues,
            saving,
            loading,
            loadingText,
            success,
            successText,
            Icon,
            noRender,
            isEditing
         } = this.state
        return(
            <div>
                {
                    !noRender &&
                    <Fragment>
                        {
                            saving?
                            <Loader
                            loadingText={loadingText}
                            successText={successText}
                            Icon={Icon}
                            success={success}
                            loading={loading}/>
                            :
                            <Fragment>
                                {
                                    width !== 'xs' && width !== 'sm'?
                                    <Fragment>
                                        <HeaderLayout>
                                            <Typography component="h2" variant="h2" color="inherit">Nuevo Pedido</Typography>
                                        </HeaderLayout>
                                        <MyStepper
                                            activeStep={activeStep}
                                            handleNext={this.handleNext}
                                            handleBack={this.handleBack}
                                            onComplete={this.handleComplete}
                                            >
                                            <MyStep title="Cliente">
                                                <ClientForm
                                                    isEditing={isEditing}
                                                    clients={this.props.clients}
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
                                    </Fragment>
                                    :
                                    <MyMobileStepper
                                        step={activeStep}
                                        handleInitialBack={this.handleGoBack}
                                        initialBackTitle="Cancelar"
                                    >
        
                                        <MyMobileStep
                                            title="Cliente"
                                            handleNext={this.handleNext}
                                        >
                                            <ClientForm
                                                isEditing={isEditing}
                                                clients={this.props.clients}
                                                handleSubmit={this.handleSubmit}
                                                saveSubmitRef={this.saveSubmitRef(0)} 
                                                options={clientsList}
                                                iniValues={formValues}
                                                />
                                        </MyMobileStep>
        
                                        <MyMobileStep
                                            title="Envio"
                                            handleNext={this.handleNext}
                                            handleBack={this.handleBack}
                                        >
                                            <ShippingForm
                                                handleSubmit={this.handleSubmit}
                                                saveSubmitRef={this.saveSubmitRef(1)}
                                                iniValues={formValues.shipping}/>
                                        </MyMobileStep>
        
                                        <MyMobileStep
                                            title="Prendas"
                                            handleNext={this.handleNext}
                                            handleBack={this.handleBack}
                                        >
                                            <ProductsForm
                                                currency={formValues.currency}
                                                initialValues={formValues.products}
                                                handleSubmit={this.handleSubmit}
                                                saveSubmitRef={this.saveSubmitRef(2)} 
                                                customPrices={{'6RlzAuoMKsCqyMEVoCtn':{cop: 84000}}} 
                                                allProducts={products}/>
                                        </MyMobileStep>
        
                                        <MyMobileStep
                                            title="Cobro"
                                            handleNext={this.handleNext}
                                            handleBack={this.handleBack}
                                        >
                                            <DiscountForm
                                                handleSubmit={this.handleSubmit}
                                                saveSubmitRef={this.saveSubmitRef(3)}
                                                initialValues={formValues}
                                            />
                                        </MyMobileStep>
                                        
                                        <MyMobileStep
                                            title="Resumen"
                                            handleBack={this.handleBack}
                                            buttonTitle="Guardar"
                                            handleNext={this.handleSave}    
                                        >
                                            <OrderResume currency={formValues.currency} data={formValues} />
                                        </MyMobileStep>
                                        
        
                                    </MyMobileStepper>
                                }
                            </Fragment>
                        }

                    </Fragment>
                }
            </div>
        )
    }
}

const mapDispatchToProps ={
    showBackButtom,
    hideBackButtom,
    addAllProducts,
    getAllOrders
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


export default connect(mapStateToProps, mapDispatchToProps) (withWidth()(NewOrder))