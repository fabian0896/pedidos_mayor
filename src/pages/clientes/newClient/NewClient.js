import React, { Component, Fragment } from "react";
import MyStep from '../../../componets/mystepper/MyStep'
import MyStepper from '../../../componets/mystepper/MyStepper'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import NewClientFormLocation from './NewClientFormLocation'
import NewClientFromGeneral from "./NewClientFromGeneral";
import NewClientResume from "./NewClientResume";
import HeaderLayout from '../../../componets/headerLayout/HeaderLayout'
import { connect } from 'react-redux'
import { showBackButtom, hideBackButtom } from '../../../actions'
import { createUpdateClient, deleteClient } from '../../../lib/firebaseService'
import Loader from '../../../componets/loader/Loader'
import { withRouter } from 'react-router-dom'
import { setTimeout } from "timers";
import Button from '@material-ui/core/Button'
import {
    Save as SaveIcon,
    Delete as DeleteIcon
} from '@material-ui/icons'
import MyMobileStepper from '../../../componets/myMobileStepper/MyMobileStepper'
import MyMobileStep from '../../../componets/myMobileStepper/MyMobileStep'
import { withWidth } from "@material-ui/core";



const styles = theme => ({
    formContainer: {
        margin: `${theme.spacing.unit * 2}px 0`
    },
    deleteButton: {
        position: 'absolute',
        right: `${theme.spacing.unit * 2}px`,
        top: `${theme.spacing.unit * 2}px`
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
            currency: 'USD'
        },
        countries: null,
        activeStep: 0,
        options: [],
        saving: false,
        loading: false,
        success: false,
        noRender: true,
        isEditing: false,
        Icon: null,
        loadingText: '',
        successText: ''
    }

    submitFunctions = []

    getAllConuntries = async () => {
        const res = await fetch('https://restcountries.com/v2/all')
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
            .then(() => {
                this.getEditInfo()
            })
    }

    getEditInfo = () => {
        const { options } = this.state
        const { client } = this.props
        if (client) {
            const countryIndex = options.find(country => {
                return (country.label === client.country.translations.es) || (country.label === client.country.name)
            })
            this.setState({
                info: {
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
        } else {
            this.setState({ noRender: false, isEditing: false })
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
        console.log("baaack")
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

    handleDeleteClient = async () => {
        const { clientId } = this.props
        this.setState({
            saving: true,
            loading: true,
            success: false,
            Icon: DeleteIcon,
            loadingText: 'Estamos borrando el cliente',
            successText: 'El cliente se borro correctamente!'
        })
        await deleteClient(clientId).catch(err => console.log(err))
        this.setState({ success: true, loading: false })
        setTimeout(() => {
            this.props.history.push('/clientes')
        }, 700)
    }

    handleSave = () => {
        const { country } = this.state.info
        const { countries } = this.state
        const { clientId, from } = this.props
        const client = {
            ...this.state.info,
            country: countries[country.value]
        }

        this.setState({
            saving: true,
            loading: true,
            success: false,
            Icon: SaveIcon,
            loadingText: 'Se estan guardado los datos',
            successText: 'Los datos se guardaron correctamente!'
        })
        createUpdateClient(client, clientId)
            .then(() => {
                this.setState({ success: true, loading: false })
                setTimeout(() => {
                    this.props.history.push(from || '/clientes')
                }, 700)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleGoBack = () =>{
        this.props.history.goBack()
    }

    render() {
        const {
            countries,
            activeStep,
            options,
            success,
            loading,
            saving,
            noRender,
            isEditing,
            Icon,
            loadingText,
            successText
        } = this.state
        const { classes, width } = this.props


        return (
            <div>
                {
                    !noRender &&
                    <div style={{ position: 'relative' }}>
                        {
                            saving ?
                                <Loader
                                    loadingText={loadingText}
                                    successText={successText}
                                    Icon={Icon}
                                    success={success}
                                    loading={loading} />
                                :
                                <Fragment>
                                    {
                                        (width !== 'sm' && width !== 'xs') ?
                                            <Fragment>
                                                <HeaderLayout >
                                                    <Typography color="inherit" component="h2" variant="h2">Agregar Cliente</Typography>
                                                </HeaderLayout>
                                                <MyStepper
                                                    activeStep={activeStep}
                                                    handleNext={this.sumbitForm}
                                                    handleBack={this.handleBack}
                                                    onComplete={this.handleComplete}>
                                                    <MyStep title="Informacion General" >
                                                        <div>
                                                            {
                                                                isEditing &&
                                                                <Button
                                                                    onClick={this.handleDeleteClient}
                                                                    className={classes.deleteButton}
                                                                    color="secondary"
                                                                    variant="outlined">
                                                                    Eliminar
                                                            </Button>
                                                            }
                                                        </div>
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
                                            </Fragment>
                                            :
                                            <MyMobileStepper
                                                step={activeStep}
                                                handleInitialBack={this.handleGoBack}
                                                initialBackTitle="Cancelar"
                                                submit={this.submitRef}>
                                                <MyMobileStep
                                                    handleNext={this.sumbitForm}
                                                    title="Informacion General">
                                                    <NewClientFromGeneral
                                                            getSubmitRef={this.getSubmitRefGeneral}
                                                            getRef={this.getFormRef}
                                                            handleSubmit={this.handleSubmit}
                                                            {...this.state.info} />
                                                </MyMobileStep>
                                                <MyMobileStep
                                                    handleBack={this.handleBack}
                                                    handleNext={this.sumbitForm}
                                                    title='Ubicacion'>
                                                    <NewClientFormLocation
                                                            options={options}
                                                            getSubmitRef={this.getSubmitRefLocation}
                                                            getRef={this.getFormRef}
                                                            handleSubmit={this.handleSubmit}
                                                            {...this.state.info} />
                                                </MyMobileStep>
                                                <MyMobileStep
                                                    handleBack={this.handleBack}
                                                    buttonTitle="Guardar"
                                                    handleNext={this.handleSave}
                                                    title='Resumen'>
                                                    <NewClientResume
                                                            {...this.state.info}
                                                            country={countries && this.state.info.country && countries[this.state.info.country.value]}
                                                        />
                                                </MyMobileStep>
                                            </MyMobileStepper>
                                    }
                                </Fragment>
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

function mapStateToProps(state, props) {
    const routerState = props.location.state;
    let id = 0;
    let from = null
    if (routerState) {
        id = routerState.clientId
        from = routerState.from
    }
    return {
        client: state.clients.all[id],
        from,
        clientId: id
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter((withStyles(styles)(withWidth()(NewClient)))));