import React, { Component } from "react";
import MyStep from '../../../componets/mystepper/MyStep'
import MyStepper from '../../../componets/mystepper/MyStepper'
import { withStyles } from '@material-ui/core/styles'
import NewClientFormLocation from './NewClientFormLocation'
import NewClientFromGeneral from "./NewClientFromGeneral";
import NewClientResume from "./NewClientResume";
import { connect } from 'react-redux'
import { showBackButtom, hideBackButtom } from '../../../actions'
import { createCliente, updateClient, createUpdateClient } from '../../../lib/firebaseService'
import Loader from '../../../componets/loader/Loader'
import { withRouter } from 'react-router-dom'
import { setTimeout } from "timers";



const styles = theme => ({
    formContainer: {
        margin: `${theme.spacing.unit * 2}px 0`
    }
})


class NewClient extends Component {

    state = {
        info: {
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
        options: [],
        saving: false,
        loading: false,
        success: false,
        noRender: true,
        isEditing: false
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
        this.setState({ countries: data, options });
        return
    }

    componentDidMount() {    
        this.props.showBackButtom()
        this.getAllConuntries()
            .then(()=>{
                this.getEditInfo()
            })
    }

    getEditInfo = ()=>{
        const { options } = this.state
        const {client} = this.props
        if(client){
            const countryIndex = options.find(country => {
                return (country.label === client.country.translations.es ) || (country.label === client.country.name)
            })
            this.setState({
                info:{
                    name: client.name,
                    email: client.email,
                    phone: client.phone,
                    city: client.city,
                    address: client.address,
                    zipCode: client.zipCode,
                    country: countryIndex
                },
                noRender: false,
                isEditing: true,

            })
        }else{
            this.setState({noRender: false, isEditing: false})
        }
    }


    componentWillUnmount() {
        this.props.hideBackButtom()
    }


    handleSubmit = (values, actions) => {
        //primero tengo que guardar los valores en el estado
        //luego cambio el aciveStep a el siguianete
        this.setState(state => ({
            info: {
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
    }


    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    getSubmitRefGeneral = (sumbitForm) => {
        this.submitFunctions[0] = sumbitForm
    }
    getSubmitRefLocation = (sumbitForm) => {
        this.submitFunctions[1] = sumbitForm
    }

    sumbitForm = () => {
        this.submitFunctions[this.state.activeStep]()
    }

    handleSave = () => {
        const { country } = this.state.info
        const { countries } = this.state
        const { clientId, from } = this.props
        const client = {
            ...this.state.info,
            country: countries[country.value]
        }

        this.setState({ saving: true, loading: true, success: false })
        createUpdateClient(client, clientId )
            .then(()=>{
                this.setState({ success: true, loading: false })
                setTimeout(() => {
                    this.props.history.push(from || '/clientes')
                }, 600)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    render() {
        const {
            countries,
            activeStep,
            options,
            success,
            loading,
            saving,
            noRender
        } = this.state

        return (
            <div>
                {
                    !noRender &&
                    <div>
                        {
                            saving ?
                                <Loader
                                    success={success}
                                    loading={loading} />
                                :
                                <MyStepper
                                    activeStep={activeStep}
                                    handleNext={this.sumbitForm}
                                    handleBack={this.handleBack}
                                    onComplete={this.handleComplete}>
                                    <MyStep title="Informacion General" >
                                        <NewClientFromGeneral
                                            getSubmitRef={this.getSubmitRefGeneral}
                                            getRef={this.getFormRef}
                                            handleSubmit={this.handleSubmit}
                                            {...this.state.info} />

                                    </MyStep>
                                    <MyStep title="Ubicacion" >
                                        <NewClientFormLocation
                                            options={options}
                                            getSubmitRef={this.getSubmitRefLocation}
                                            getRef={this.getFormRef}
                                            handleSubmit={this.handleSubmit}
                                            {...this.state.info} />
                                    </MyStep>
                                    <MyStep onFinish={this.handleSave} title="Resumen" >
                                        <NewClientResume
                                            {...this.state.info}
                                            country={countries && this.state.info.country && countries[this.state.info.country.value]}
                                        />
                                    </MyStep>
                                </MyStepper>
                        }
                    </div>

                }

            </div>
        )
    }
}


const mapDispatchToProps = {
    showBackButtom,
    hideBackButtom
}

function mapStateToProps(state, props){
    const routerState = props.location.state;
    let id = 0;
    let from = null
    if(routerState){
        id = routerState.clientId
        from = routerState.from
    }
    return{
        client: state.clients[id],
        from,
        clientId: id
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter((withStyles(styles)(NewClient))));