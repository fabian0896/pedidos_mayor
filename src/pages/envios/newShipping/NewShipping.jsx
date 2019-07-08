import React, { Fragment } from 'react'
import Header from '../../../componets/headerLayout/HeaderLayout'
import { Typography, withWidth } from '@material-ui/core';
import MyStepper from '../../../componets/mystepper/MyStepper';
import MyStep from '../../../componets/mystepper/MyStep';
import ClientForm from './ClientForm';
import { getPendingOrders } from '../../../lib/firebaseService'
import { connect } from 'react-redux'
import ProductsShippingForm from './ProductsShippingForm';
import ShippingForm from '../../pedidos/newOrder/ShippingForm'
import ShippingResume from './ShippingResume';
import { AddShipping, updateShipping } from '../../../lib/firebaseService'
import { Save as SaveIcon } from '@material-ui/icons'
import Loader from '../../../componets/loader/Loader'
import { compose } from 'redux'
import MyMobileStepper from '../../../componets/myMobileStepper/MyMobileStepper';
import MyMobileStep from '../../../componets/myMobileStepper/MyMobileStep';
import { showBackButtom, hideBackButtom } from '../../../actions'

class NewShipping extends React.Component {

    state = {
        activeStep: 0,
        options: [],
        formValues: {
            shipping: {}
        },
        loadingText: '' , 
        successText: '', 
        success: false, 
        loading: false,
        saving: false,
        noRender: true,
        isEditing: false
    }

    submit = Array(5).fill(null)


    async componentDidMount() {
        this.props.showBackButtom()
        const options = await this.getOrderOptions()
        this.setState({ options })
        const editShipping = this.props.location.state
        if(editShipping){
            this.setState({
                formValues: editShipping,
                isEditing: true
            })
        }
        this.setState({noRender: false})
        document.title = `${this.state.isEditing?'Editando':'Nuevo'} envio`
    }

    componentWillUnmount(){
        this.props.hideBackButtom()
    }

    getOrderOptions = async () => {
        const orders = await getPendingOrders()

        return orders.map(order => ({
            label: order.serialCode,
            value: order.id,
            id: order.id,
            secondary: this.props.clients[order.clientId].name,
            clientId: order.clientId,
            pendingProducts: order.totalProducts - (order.shippedProducts || 0),
            country: this.props.clients[order.clientId].country.translations.es || this.props.clients[order.clientId].country.name,
            city: this.props.clients[order.clientId].city,
            shipping: order.shipping
        }))
    }

    getSubmitRef = (step) => (submitRef) => {
        this.submit[step] = submitRef
    }

    handleSubmit = (values, actions) => {
        const { activeStep } = this.state
        if (activeStep === 0) {
            this.setState(state => ({
                formValues: {
                    ...state.formValues,
                    ...values,
                    shipping: values.order.shipping,
                }
            }))
        } else if(activeStep === 1){
            this.setState(state=>({
                formValues:{
                    ...state.formValues,
                    shipping:{
                        ...values
                    }
                }
            }))
        } else {
            this.setState(state => ({
                formValues: {
                    ...state.formValues,
                    ...values
                }
            }))
        }


        this.setState(state => ({
            activeStep: state.activeStep + 1
        }))
    }

    handleBack = () => {
        this.setState(state => ({ activeStep: state.activeStep - 1 }))
    }

    handleNext = () => {
        this.submit[this.state.activeStep]()
    }

    handleGoBack = () =>{
        this.props.history.goBack()
    }

    handleComplete = async () => {
        this.setState({
            saving: true,
            loadingText: 'Se esta agregando el envio a la orden',
            successText: 'Se agrego el envio correctaamente',
            success: false,
            loading: true,
        })
        if(this.state.isEditing){
            await updateShipping(this.state.formValues.id, this.state.formValues)
        }else{
            await AddShipping(this.state.formValues)
        }
        this.setState({success: true, loading: false})
        const routerState = this.props.location.state || {}
        setTimeout(()=>{
            this.props.history.push(routerState.from || '/envios')
        }, 700)  
    }

    render() {
        const { 
            options, 
            activeStep, 
            formValues, 
            loadingText, 
            successText, 
            success, 
            loading,
            saving,
            noRender,
        } = this.state
        const {width} = this.props
 
        return (    
            <div>
                {
                    !noRender &&
                    <Fragment>
                        {
                            saving?
                            <Loader
                                loadingText={loadingText}
                                successText={successText}
                                Icon={SaveIcon}
                                success={success}
                                loading={loading} />
                            :
                            <Fragment>
                                {
                                    (width === 'xs' || width === 'sm') ?
                                    <Fragment>
                                        <MyMobileStepper
                                            step={activeStep}
                                            handleInitialBack={this.handleGoBack}
                                            initialBackTitle="Cancelar">
                                            <MyMobileStep
                                                title="Pedido"
                                                handleNext={this.handleNext}
                                                handleBack={this.handleBack}>
                                                    <ClientForm
                                                    initialvalues={this.state.formValues}
                                                    getSubmitRef={this.getSubmitRef(0)}
                                                    handleSubmit={this.handleSubmit}
                                                    options={options} />
                                            </MyMobileStep>
                                            
                                            <MyMobileStep
                                                title="Datos Envio"
                                                handleNext={this.handleNext}
                                                handleBack={this.handleBack}>
                                                    <ShippingForm
                                                    required
                                                    handleSubmit={this.handleSubmit}
                                                    saveSubmitRef={this.getSubmitRef(1)}
                                                    iniValues={formValues.shipping} />
                                            </MyMobileStep>
                                            
                                            <MyMobileStep
                                                title="Empaque"
                                                handleNext={this.handleNext}
                                                handleBack={this.handleBack}>
                                                    <ProductsShippingForm
                                                    initialvalues={formValues}
                                                    getSubmitRef={this.getSubmitRef(2)}
                                                    handleSubmit={this.handleSubmit}
                                                    order={formValues.order} />
                                            </MyMobileStep>
                                            
                                            <MyMobileStep
                                                title="Resumen"
                                                buttonTitle="Guardar"
                                                handleNext={this.handleComplete}
                                                handleBack={this.handleBack}>
                                                     <ShippingResume float shipping={formValues} />
                                            </MyMobileStep>
                                            
                                        </MyMobileStepper>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <Header>
                                            <Typography color="inherit" component="h2" variant="h2">{`${this.state.isEditing?'Editando':'Nuevo'} Envio`}</Typography>
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
                                                    iniValues={formValues.shipping} />
                                            </MyStep>
                                            <MyStep title="Unidad de Empaque">
                                                <ProductsShippingForm
                                                    initialvalues={formValues}
                                                    getSubmitRef={this.getSubmitRef(2)}
                                                    handleSubmit={this.handleSubmit}
                                                    order={formValues.order} />
                                            </MyStep>
                                            <MyStep
                                                onFinish={this.handleComplete}
                                                title="Resumen">
                                                <ShippingResume shipping={formValues} />
                                            </MyStep>
                                        </MyStepper>
                                    </Fragment>
                                }
                            </Fragment>
                        }
                    </Fragment>
                }
            </div>
        )
    }
}



function mapStateToProps(state, props) {
    return {
        clients: state.clients.all
    }
}

const mapDispatchToProps = {
    showBackButtom,
    hideBackButtom
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withWidth()
    )(NewShipping)