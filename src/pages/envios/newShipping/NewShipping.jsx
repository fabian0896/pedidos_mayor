import React from 'react'
import Header from '../../../componets/headerLayout/HeaderLayout'
import { Typography } from '@material-ui/core';
import MyStepper from '../../../componets/mystepper/MyStepper';
import MyStep from '../../../componets/mystepper/MyStep';
import ClientForm from './ClientForm';
import { getPendingOrders } from '../../../lib/firebaseService'
import { connect } from 'react-redux'



class NewShipping extends React.Component{

    state={
        activeStep: 0,
        options: [],
        formValues: {}
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
            secondary: this.props.clients[order.clientId].name
        }))
    }

    getSubmitRef = (step) => (submitRef)=>{
        this.submit[step] = submitRef
    }

    handleSubmit= (values, actions)=>{   
        console.log(values)


        

        this.setState(state=>({
            activeStep: state.activeStep + 1,
            formValues: {
                ...state.formValues,
                ...values
            }
        }))
    }

    handleBack = ()=>{
        this.setState(state=>({activeStep: state.activeStep - 1}))
    }

    handleNext = ()=>{
        this.submit[this.state.activeStep]()
    }

    handleComplete = () => {
        
    }

    render(props){ 
       const { options, activeStep } = this.state
        return(
            <div>
                <Header>
                    <Typography color="inherit" component="h2" variant="h2">Nuevo Envio</Typography>
                </Header>
                <MyStepper
                    activeStep={activeStep}
                    handleNext={this.handleNext}
                    handleBack={this.handleBack}
                    onComplete={this.handleComplete} >
                    <MyStep title="Pedido">
                        <ClientForm
                            initialvalues={this.state.formValues}
                            getSubmitRef={this.getSubmitRef(0)}
                            handleSubmit={this.handleSubmit} 
                            options={options} />
                    </MyStep>
                    <MyStep title="Prendas">
    
                    </MyStep>
                    <MyStep title="Unidad de Empaque">
    
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