import React, { Component, Fragment } from 'react';
import ProductTable from './ProductTable.jsx';
import HeaderLayout from '../../componets/headerLayout/HeaderLayout'
import { Grid, Paper } from '@material-ui/core'
import SearchBar from '../../componets/searchBar/SearchBar.js';
import TopList from '../../componets/topList/TopList.jsx'
import TopListItem from '../../componets/topList/TopListItem'
import MyModal from '../../componets/myModal/MyModal'
import NewProductForm from './NewProductForm'
import { deletProduct, addOrUpdateProduct } from '../../lib/firebaseService'
import { getYearStats} from '../../lib/statsService'
import Loader from '../../componets/loader/Loader'
import {    
    Save as SaveIcon,
    Delete as DeleteIcon,
    Search as SearchIcon
 } from '@material-ui/icons'
 import { getProductLines } from '../../lib/searchService'
 import { connect } from 'react-redux' 
 import { addAllProducts, addRecentProducts } from '../../actions'
 import ModalAlert from '../../componets/modalAlert/ModalAlert'
 import withWidth from '@material-ui/core/withWidth';
 import { searchProduct } from '../../lib/searchService'
import NoFindMessage from '../../componets/noFindMessage/NoFindMessage.jsx';
import moment from 'moment'

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
        deleteId: null,
        searchresults: null,
        isSearching: false,
        loadingSearch: false,
        topProducts: []
    }

    handleOpenModal= ()=>{
        const { width } = this.props
        const { editingValues } = this.state
        if(width !== 'xs' && width !== 'sm'){
            this.setState({modalOpen: true})
            return
        }
        this.props.history.push({
            pathname: '/prendas/nueva',
            state: {
                id: editingValues.id
            }
        })
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
        
        console.log("Se actualizo la prenda")

        this.setState({
            loadingModal: false,
            successModal: true
        })

        setTimeout(()=>{
            this.setState({
                savingModal:false
            })
            this.props.addAllProducts()
            this.props.addRecentProducts()
            this.handleCloseModal()
        }, 700)
        //actions.setSubmitting(false)
        //actions.resetForm()
    }
    
    async componentDidMount(){
        document.title = "Prendas"
        
        this.props.addAllProducts()
        this.props.addRecentProducts()
        this.getLines()
        await Promise.all([
            this.getLines(),
            this.getTopProducts()
        ])
        return
    }


    getTopProducts = async ()=>{
        const yearStats = await getYearStats(moment().year())
        //const { allProducts } = this.props
        //console.log(yearStats.products)
        const topProducts = Object.keys(yearStats? yearStats.products: {})
                                    .sort((a,b)=>yearStats.products[b].quantity - yearStats.products[a].quantity)
                                    .slice(0,5)
                                    .map(id => ({
                                        primary: yearStats.products[id].name,
                                        secondary: yearStats.products[id].line,
                                        id
                                    }))
        this.setState({topProducts})
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
        this.setState({
            loadingText: 'Borrando Prenda',
            successText: 'La prenda se borro correctamente',
            savingModal: true,
            loadingModal: true,
            successModal: false
        })
        await deletProduct(deleteId)

        this.setState({
            loadingModal: false,
            successModal: true
        })

        setTimeout(()=>{
            this.setState({
                savingModal:false,
                deleteId: null
            })
            this.props.addAllProducts()
            this.props.addRecentProducts()
            this.getLines()
            this.handleCloseAlert()
        }, 700)
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

    handleSubmitSeach = async (event, value)=>{
        event.preventDefault()
        this.setState({loadingSearch: true})
        const res = await searchProduct(value, {formated: true})
        if(value){
            this.setState({searchresults: res, loadingSearch: false, isSearching: true})
        }else{
            this.setState({searchresults: null, loadingSearch: false, isSearching: false})
        }
        return
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
            searchresults,
            isSearching,
            loadingSearch,
            topProducts
        } = this.state

        const { allProducts, recentProducts } = this.props
        const { formatedProducts } = this.props
        const deletingProduct = allProducts[deleteId] || {name: ''}

        const productsToShow = searchresults || formatedProducts

        return(
            <div>
                <ModalAlert
                    onConfirm={this.handleDelete}
                    onClose={this.handleCloseAlert}
                    hideContent={savingModal}
                    type="error"
                    message={`seguro que quieres borrar ${deletingProduct.name} ?`}
                    open={alertOpen}>
                        {
                            savingModal &&
                            <Loader
                                floating 
                                loadingText={loadingText}
                                successText={successText}
                                Icon={DeleteIcon}
                                success={successModal}
                                loading={loadingModal} />
                        }
                    </ModalAlert>
                
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
                    <SearchBar handleSubmit={this.handleSubmitSeach} handleAdd={this.handleOpenModal} />
                </HeaderLayout>
                <Grid container spacing={24}>
                    <Grid zeroMinWidth item xs={12} sm={12} md={9}>
                    {
                        loadingSearch &&
                        <Paper>
                            <Loader
                                    floating 
                                    loadingText="Buscando Prenda"
                                    successText="estos son los resultados..."
                                    Icon={SearchIcon}
                                    success={false}
                                    loading={true} />
                        </Paper>
                    }
                    {
                        !loadingSearch &&
                        <Fragment>
                            {
                                (isSearching && !productsToShow.length)?
                                <NoFindMessage
                                    message="No se encotro la prenda"
                                    subMessage="Pero no dudes en agregarla !"
                                    callToAction="Agregar prenda!"
                                    cta={this.handleOpenModal}
                                />
                                :
                                productsToShow.map((line, index)=>{
                                    return <ProductTable
                                                handleDelete={this.handleOpenAlert}
                                                handleEdit={this.handleEdit}
                                                count={line.count}  
                                                name={line.name} 
                                                key={index} 
                                                data={line.products} />
                                })
                            }   
                        </Fragment>
                    }
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <TopList handleClick={(id) => () =>{console.log(id)}}>
                            <TopListItem
                                title="Prendas Más Vendidas"
                                data={topProducts}
                                withNumbers
                            />   
                            <TopListItem
                                title="Ultimas Añadidas"
                                data={recentProducts}
                            />   
                        </TopList>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


const mapDispatchToProps = {
    addAllProducts,
    addRecentProducts
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


    const recentProducts = Object.keys(state.products.recent).map(id => {
        const actualProduct = state.products.recent[id]
        return{
            primary: actualProduct.name,
            secondary: actualProduct.line,
            id
        }
    })
    
    
    
    return{
        formatedProducts,
        allProducts: state.products.all,
        lines,
        recentProducts
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(Prendas));