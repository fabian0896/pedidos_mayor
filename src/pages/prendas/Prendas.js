import React, { Component } from 'react';
import ProductTable from './ProductTable.jsx';
import HeaderLayout from '../../componets/headerLayout/HeaderLayout'
import { Grid } from '@material-ui/core'
import SearchBar from '../../componets/searchBar/SearchBar.js';
import TopList from '../../componets/topList/TopList.jsx'
import TopListItem from '../../componets/topList/TopListItem'
import MyModal from '../../componets/myModal/MyModal'
import NewProductForm from './NewProductForm'
import { deletProduct, addOrUpdateProduct } from '../../lib/firebaseService'
import Loader from '../../componets/loader/Loader'
import {    
    Save as SaveIcon,
    Delete as DeleteIcon,
 } from '@material-ui/icons'
 import { getProductLines } from '../../lib/searchService'
 import { connect } from 'react-redux' 
 import { addAllProducts } from '../../actions'
 import ModalAlert from '../../componets/modalAlert/ModalAlert'
 import withWidth from '@material-ui/core/withWidth';


const dataTest = [
    {
        primary: 'prueba',
        secondary: 'secondary',
        id: '1'
    },
    {
        primary: 'prueba',
        secondary: 'secondary',
        id: '2'
    },
    {
        primary: 'prueba',
        secondary: 'secondary',
        id: '3'
    },
    {
        primary: 'prueba',
        secondary: 'secondary',
        id: '4'
    },
    {
        primary: 'prueba',
        secondary: 'secondary',
        id: '5'
    },
]



class Prendas extends Component{    
    
    state={
        modalOpen: false,
        loadingModal: false,
        successModal: false,
        savingModal: false,
        loadingText: '',
        successText: '',
        linesOptions: [],
        isEditing: false,
        editingValues: {},
        alertOpen: false,
        deleteId: null
    }

    handleOpenModal= ()=>{
        const { width } = this.props
        if(width !== 'xs'){
            this.setState({modalOpen: true})
            return
        }
        this.props.history.push('/prendas/nueva')
    }

    handleCloseModal = ()=>{
        this.setState({
            modalOpen: false,
            isEditing: false,
            editingValues: {}
        })
    }

    handleSubmit = async (values, actions)=>{
        const { isEditing, editingValues } = this.state
        this.setState({
            loadingText: 'Agregando prenda',
            successText: 'la prenda se agrego correctamente',
            savingModal: true,
            loadingModal: true,
            successModal: false
        })
        let id = null
        if(isEditing){
            id = editingValues.id
        }
        
        await addOrUpdateProduct(values, id)
        //await addProduct(values)

        this.setState({
            loadingModal: false,
            successModal: true
        })

        setTimeout(()=>{
            this.setState({
                savingModal:false
            })
            this.props.addAllProducts()
            this.handleCloseModal()
        }, 700)
        //actions.setSubmitting(false)
        //actions.resetForm()
    }
    
    async componentDidMount(){
        this.props.addAllProducts()
        await this.getLines()
        return
    }

    handleOpenAlert = (id)=>()=>{
        this.setState({alertOpen: true, deleteId: id})
    }
  

    handleCloseAlert = ()=>{
        this.setState({alertOpen: false})
    }

    getLines = async ()=>{
        const lines = await getProductLines()
        const linesOptions = lines.map(line =>({label: line.name, value: line.name}))
        this.setState({linesOptions})
        return
    }

    handleDelete = async ()=>{
        const { deleteId } = this.state
        console.log("Se Borro la prendaaa!", deleteId)
        await deletProduct(deleteId)
        this.props.addAllProducts()
        this.setState({deleteId: null})
    }


    handleEdit = (id)=>(event)=>{
        const {allProducts} = this.props
        const values = allProducts[id]
        this.setState({
            editingValues: {...values, id},
            isEditing: true
        }, ()=>{
            this.handleOpenModal()
        })
    }


    render(){
        const { 
            savingModal, 
            loadingModal, 
            successModal,
            loadingText,
            successText,
            linesOptions,
            isEditing,
            editingValues,
            alertOpen,
            deleteId,
        } = this.state

        const { allProducts, width } = this.props
        const { formatedProducts } = this.props
        const deletingProduct = allProducts[deleteId] || {name: ''}

        return(
            <div>
                <ModalAlert
                    onConfirm={this.handleDelete}
                    onClose={this.handleCloseAlert}
                    type="warning"
                    title="Atención!!" 
                    message={`seguro que quieres borrar ${deletingProduct.name} ?`}
                    open={alertOpen}/>
                
                <MyModal
                      
                    open={ this.state.modalOpen }
                    onClose={this.handleCloseModal}
                    title="Agregar Prenda"
                >
                    <div>
                        {
                            savingModal?
                            <Loader
                                floating 
                                loadingText={loadingText}
                                successText={successText}
                                Icon={SaveIcon}
                                success={successModal}
                                loading={loadingModal} />
                            :
                            <NewProductForm
                                isEditing={isEditing}
                                editingValues={editingValues} 
                                linesOptions={linesOptions} 
                                handleSubmit={this.handleSubmit} 
                                closeModal={this.handleCloseModal}/>
                        }
                    </div>
                </MyModal>
                <HeaderLayout>
                    {/* <Typography style={{fontWeight: 500}} color="inherit" component="h2" variant="h2">Lista De Prendas</Typography> */}
                    <SearchBar handleAdd={this.handleOpenModal} />
                </HeaderLayout>
                <Grid container spacing={24}>
                    <Grid zeroMinWidth item xs={12} sm={12} md={9}>
                    {
                        formatedProducts.map((line, index)=>{
                            return <ProductTable
                                        handleDelete={this.handleOpenAlert}
                                        handleEdit={this.handleEdit}
                                        count={line.count}  
                                        name={line.name} 
                                        key={index} 
                                        data={line.products} />
                        })
                    }
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <TopList handleClick={(id) => () =>{console.log(id)}}>
                            <TopListItem
                                title="Prendas Más Vendidas"
                                data={[]}
                                withNumbers
                            />   
                            <TopListItem
                                title="Ultimas Añadidas"
                                data={dataTest}
                            />   
                        </TopList>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


const mapDispatchToProps = {
    addAllProducts
}

function mapStateToProps(state, props){
    
    const allProducts = state.products.all
    const productList = Object.keys(allProducts).map(id => allProducts[id])
    const lines  = []

    productList.forEach(product => {
        const matchLine = lines.find(line => line.toLowerCase() === product.line.toLowerCase())
        if(!matchLine){
            lines.push(product.line)
        }
    })
    const formatedProducts = lines.map((lineValue)=>{
        const _products = productList.filter(({line})=> line.toLowerCase() === lineValue.toLowerCase())
        return {
            name: lineValue,
            count: _products.length,
            products: _products
        }
    })


    
    return{
        formatedProducts,
        allProducts: state.products.all,
        lines
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(Prendas));