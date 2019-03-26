import React, { Component } from "react";
import MyStep from '../../../componets/mystepper/MyStep'
import MyStepper from '../../../componets/mystepper/MyStepper'
import { withStyles } from '@material-ui/core/styles'
import NewClientFormLocation from './NewClientFormLocation'
import NewClientFromGeneral from "./NewClientFromGeneral";
import NewClientResume from "./NewClientResume";
import { connect } from 'react-redux'
import { showBackButtom, hideBackButtom } from '../../../actions'


const styles = theme => ({
    formContainer: {
        margin: `${theme.spacing.unit * 2}px 0`
    }
})


class NewClient extends Component {

    state = {
        info:{
            name: '',
            email: '',
            phone: '',
            country: null,
            city: '',
            address: '',
            zipCode: '',
        },
        countries: null,
        activeStep: 0,
        options: []
    }

    submitFunctions = []

    getAllConuntries = async () => {
        const res = await fetch('https://restcountries.eu/rest/v2/all')
        const data = await res.json()
        const options = data.map((country, index) => {
            return {
                value: index,
                label: country.translations.es || country.name
            }
        })
        this.setState({countries: data, options});
    }

    componentDidMount(){
        this.getAllConuntries();
        this.props.showBackButtom()
    }

    componentWillUnmount(){
        this.props.hideBackButtom()
    }


    handleSubmit = (values, actions) => {
        //primero tengo que guardar los valores en el estado
        //luego cambio el aciveStep a el siguianete
        this.setState(state =>({
            info:{
                ...state.info,
                ...values
            }
        }))
        this.handleNext()
        actions.setSubmitting(false)
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
      };
    
      handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
      };

     getSubmitRefGeneral = (sumbitForm)=>{
         this.submitFunctions[0] = sumbitForm
     }
     getSubmitRefLocation = (sumbitForm)=>{
         this.submitFunctions[1] = sumbitForm
     }

     sumbitForm = ()=>{
        this.submitFunctions[this.state.activeStep]()
     }

     handleSave = ()=>{
         console.log("Se guardo el registro!")
        //logic to save or update the client in firebase
     }

    render() {
        const { classes } = this.props
        const { countries, activeStep, options } = this.state

        return (
            <div>
                <MyStepper 
                    activeStep={activeStep} 
                    handleNext={ this.sumbitForm}
                    handleBack={ this.handleBack } 
                    onComplete={this.handleComplete}>
                    <MyStep title="Informacion General" >
                        <NewClientFromGeneral
                            getSubmitRef={this.getSubmitRefGeneral} 
                            getRef={this.getFormRef}
                            handleSubmit={ this.handleSubmit }
                            {...this.state.info}  />
                            
                    </MyStep>
                    <MyStep title="Ubicacion" >
                        <NewClientFormLocation   
                            options={ options }
                            getSubmitRef={this.getSubmitRefLocation} 
                            getRef={this.getFormRef}
                            handleSubmit={ this.handleSubmit }
                            {...this.state.info} />
                    </MyStep>
                    <MyStep onFinish={this.handleSave}  title="Resumen" >
                        <NewClientResume 
                            {...this.state.info}
                            country={countries && this.state.info.country && countries[this.state.info.country.value]}
                             />
                    </MyStep>
                </MyStepper>
            </div>
        )
    }
}


const mapDispatchToProps = {
    showBackButtom,
    hideBackButtom
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(NewClient));