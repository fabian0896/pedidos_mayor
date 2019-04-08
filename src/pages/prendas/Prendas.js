import React, { Component } from 'react';
import ProductTable from './ProductTable.jsx';
import HeaderLayout from '../../componets/headerLayout/HeaderLayout'
import { Grid } from '@material-ui/core'
import SearchBar from '../../componets/searchBar/SearchBar.js';
import TopList from '../../componets/topList/TopList.jsx'
import TopListItem from '../../componets/topList/TopListItem'
import MyModal from '../../componets/myModal/MyModal'
import NewProductForm from './NewProductForm'
import { addProduct } from '../../lib/firebaseService'
import Loader from '../../componets/loader/Loader'
import {    
    Save as SaveIcon,
    Delete as DeleteIcon,
 } from '@material-ui/icons'

 import { getProductLines } from '../../lib/searchService'
 import { connect } from 'react-redux' 
 import { addAllProducts } from '../../actions'

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
    }

    handleOpenModal= ()=>{
        this.setState({modalOpen: true})
    }

    handleCloseModal = ()=>{
        this.setState({modalOpen: false})
    }

    handleSubmit = async (values, actions)=>{
        this.setState({
            loadingText: 'Agregando prenda',
            successText: 'la prenda se agrego correctamente',
            savingModal: true,
            loadingModal: true,
            successModal: false
        })
        await addProduct(values)

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

  
    getLines = async ()=>{
        const lines = await getProductLines()
        const linesOptions = lines.map(line =>({label: line.name, value: line.name}))
        this.setState({linesOptions})
        return
    }



    render(){
        const { 
            savingModal, 
            loadingModal, 
            successModal,
            loadingText,
            successText,
            linesOptions
        } = this.state

        const { formatedProducts } = this.props

        return(
            <div>
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
                            <NewProductForm linesOptions={linesOptions} handleSubmit={this.handleSubmit} />
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
        const matchLine = lines.find(line => line === product.line)
        if(!matchLine){
            lines.push(product.line)
        }
    })
    const formatedProducts = lines.map((lineValue)=>{
        const _products = productList.filter(({line})=> line === lineValue)
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


export default connect(mapStateToProps, mapDispatchToProps)(Prendas);