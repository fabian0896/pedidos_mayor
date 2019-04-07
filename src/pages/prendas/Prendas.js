import React, { Component,Fragment } from 'react';
import ProductTable from './ProductTable.jsx';
import HeaderLayout from '../../componets/headerLayout/HeaderLayout'
import { Grid, Typography } from '@material-ui/core'
import SearchBar from '../../componets/searchBar/SearchBar.js';
import TopList from '../../componets/topList/TopList.jsx'
import TopListItem from '../../componets/topList/TopListItem'
import MyModal from '../../componets/myModal/MyModal'
import NewProductForm from './NewProductForm'
import { addProduct } from '../../lib/firebaseService'
import Loader from '../../componets/loader/Loader'
import {    
    Save as SaveIcon,
    Delete as DeleteIcon
 } from '@material-ui/icons'

 import { getProductLines } from '../../lib/searchService'


const dataTest = [
    {
        primary: 'prueba',
        secondary: 'secondary',
        id: 'gasjdhafsdfasdfasga'
    },
    {
        primary: 'prueba',
        secondary: 'secondary',
        id: 'gagsdfgsdhasgjdhga'
    },
    {
        primary: 'prueba',
        secondary: 'secondary',
        id: 'gdhasgjdhga'
    },
    {
        primary: 'prueba',
        secondary: 'secondary',
        id: 'gasjdgjdhga'
    },
    {
        primary: 'prueba',
        secondary: 'secondary',
        id: 'gasjdhasgj'
    },
]



let id = 0;
function createData(name, reference, cop, usd) {
  id += 1;
  return { id, name, reference, cop, usd };
}

const rows = [
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
];




class Prendas extends Component{    
    
    state={
        modalOpen: false,
        loadingModal: false,
        successModal: false,
        savingModal: false,
        loadingText: '',
        successText: '',
        linesOptions: []
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
            this.handleCloseModal()
        }, 700)
        //actions.setSubmitting(false)
        //actions.resetForm()
    }
    
    async componentDidMount(){
        const lines = await getProductLines()
        const linesOptions = lines.map(line =>({label: line, value: line}))
        this.setState({linesOptions})
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
                        <ProductTable data={rows} />
                        <ProductTable data={rows}/>
                        <ProductTable data={rows}/>
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



export default Prendas;