import React, { Component,Fragment } from 'react';
import ProductTable from './ProductTable.jsx';
import HeaderLayout from '../../componets/headerLayout/HeaderLayout'
import { Grid, Typography } from '@material-ui/core'
import SearchBar from '../../componets/searchBar/SearchBar.js';
import TopList from '../../componets/topList/TopList.jsx'
import TopListItem from '../../componets/topList/TopListItem'
import MyModal from '../../componets/myModal/MyModal'
import NewProductForm from './NewProductForm'


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
        modalOpen: false
    }

    handleOpenModal= ()=>{
        this.setState({modalOpen: true})
    }

    handleCloseModal = ()=>{
        this.setState({modalOpen: false})
    }
    
    render(){
        return(
            <div>
                <MyModal  
                    open={ this.state.modalOpen }
                    onClose={this.handleCloseModal}
                    title="Agregar Prenda"
                >
                    <div>
                        <NewProductForm />
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