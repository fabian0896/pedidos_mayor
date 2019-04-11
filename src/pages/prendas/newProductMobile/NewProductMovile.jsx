import React, { Component, Fragment } from 'react'
import NewProductForm from '../NewProductForm'
import { getProductLines } from '../../../lib/searchService'
import MyMobileStepper from '../../../componets/myMobileStepper/MyMobileStepper';
import MyMobileStep from '../../../componets/myMobileStepper/MyMobileStep';
import { addOrUpdateProduct } from '../../../lib/firebaseService'
import {
    Save as SaveIcon,
} from '@material-ui/icons'
import Loader from '../../../componets/loader/Loader';
import { connect } from 'react-redux'
import { showBackButtom, hideBackButtom} from '../../../actions'



class NewProductMobile extends Component {

    state = {
        linesOptions: [],
        loadingText: '',
        successText: '',
        savingModal: false,
        loadingModal: false,
        successModal: false,
        isEditing: false,
        editingValues: {},
        submitRef: null,
        noRender: true
    }

    getLines = async () => {
        const lines = await getProductLines()
        const linesOptions = lines.map(line => ({ label: line.name, value: line.name }))
        this.setState({ linesOptions })
        return
    }

    handleSubmit = async (values, actions) => {
        const { isEditing, editingValues } = this.state
        this.setState({
            loadingText: 'Agregando prenda',
            successText: 'la prenda se agrego correctamente',
            savingModal: true,
            loadingModal: true,
            successModal: false
        })
        let id = null
        if (isEditing) {
            id = editingValues.id
        }

        await addOrUpdateProduct(values, id)
        //await addProduct(values)

        this.setState({
            loadingModal: false,
            successModal: true
        })

        setTimeout(() => {
            this.setState({
                savingModal: false
            })
            this.props.history.push('/prendas')
        }, 700)
        //actions.setSubmitting(false)
        //actions.resetForm()
    }

    submit = () => {
        this.submitRef()
    }

    getSubmitRef = (ref) => {
        this.submitRef = ref
    }

    handleGoBack = ()=>{
        this.props.history.goBack()
    }

     async componentDidMount() {
        await this.getLines()
        this.props.showBackButtom('/prendas')
        const { product } = this.props
        if(product){
            const count = Object.keys(product).length
            if(count){
                this.setState({
                    editingValues: product,
                    isEditing: true,
                    noRender: false
                })
            }else{
                this.setState({
                    noRender:false
                })
            }
        }
        return
    }

    componentWillUnmount(){
        this.props.hideBackButtom()
    }

    render() {
        const {
            savingModal,
            loadingModal,
            successModal,
            loadingText,
            successText,
            linesOptions,
            isEditing,
            editingValues,
            noRender
        } = this.state


        return (
            <div>
                {
                    (!noRender) &&
                    <Fragment>
                        {
                            savingModal ?
                                <Loader
                                    loadingText={loadingText}
                                    successText={successText}
                                    Icon={SaveIcon}
                                    success={successModal}
                                    loading={loadingModal}
                                />
                                :
                                <MyMobileStepper
                                    handleInitialBack={this.handleGoBack}
                                    initialBackTitle="Cancelar" 
                                    submit={this.submitRef}>
                                    <MyMobileStep
                                        buttonTitle="Guardar"
                                        handleNext={this.submit}
                                        title={`${isEditing? 'Editar' : 'Agregar'} Prenda`}>
                                        <NewProductForm
                                            isEditing={isEditing}
                                            getSubmitRef={this.getSubmitRef}
                                            handleSubmit={this.handleSubmit}
                                            withOutButtons
                                            editingValues={editingValues}
                                            linesOptions={linesOptions} />
                                    </MyMobileStep>
                                </MyMobileStepper>
        
                        }
                    </Fragment>
                }
            </div>
        )
    }
}


const mapDispatchToProps = {
    showBackButtom,
    hideBackButtom
}

function mapStateToProps(state,props){
    let id = ''
    if(props.location.state){
        id = props.location.state.id
    }
    const product = state.products.all[id]
    return{
        product: product || {}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductMobile)