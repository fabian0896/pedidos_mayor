import React, { Component } from "react";
import MyStep from '../../../componets/mystepper/MyStep'
import MyStepper from '../../../componets/mystepper/MyStepper'
import { withStyles } from '@material-ui/core/styles'
import NewClientFormLocation from './NewClientFormLocation'
import NewClientFromGeneral from "./NewClientFromGeneral";
import NewClientResume from "./NewClientResume";
import { connect } from 'react-redux'
import { showBackButtom, hideBackButtom } from '../../../actions'
import { createCliente } from '../../../lib/firebaseService'
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
        from: null
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
        const { state } = this.props.location
        
        this.props.showBackButtom()
        this.getAllConuntries()
            .then(() => {
                if (state) {
                    this.getEditData(state)
                }
            })
    }

    getEditData = (routerState) => {
        const { options } = this.state
        const { from, client } = routerState
        const countryIndex = options.find((country) => {
            return (country.label === client.country.name) || (country.label === client.country.translations.es)
        })
        this.setState({
            info:{
                ...client,
                country: countryIndex
            },
            from
        })
        console.log("lo hicimos")
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
    };

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
        const client = {
            ...this.state.info,
            country: countries[country.value]
        }

        this.setState({ saving: true, loading: true, success: false })

        createCliente(client, (err) => {
            if (err) {
                console.log(err)
                return
            }
            this.setState({ success: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/clientes')
            }, 600)
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
            info
        } = this.state

        return (
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
                                    initialValues={info}
                                    getSubmitRef={this.getSubmitRefGeneral}
                                    getRef={this.getFormRef}
                                    handleSubmit={this.handleSubmit}
                                    {...this.state.info} />

                            </MyStep>
                            <MyStep title="Ubicacion" >
                                <NewClientFormLocation
                                    initialValues={info}
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
        )
    }
}


const mapDispatchToProps = {
    showBackButtom,
    hideBackButtom
}

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(NewClient)));