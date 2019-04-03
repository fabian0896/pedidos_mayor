import React, { Component } from 'react';
import ProductTable from './ProductTable.jsx';
import HeaderLayout from '../../componets/headerLayout/HeaderLayout'
import { Grid, Typography } from '@material-ui/core'
import SearchBar from '../../componets/searchBar/SearchBar.js';


class Prendas extends Component{
    render(){
        return(
            <div>
                <HeaderLayout>
                    {/* <Typography style={{fontWeight: 500}} color="inherit" component="h2" variant="h2">Lista De Prendas</Typography> */}
                    <SearchBar />
                </HeaderLayout>
                <Grid container spacing={24}>
                    <Grid item md={9}>
                        <ProductTable />
                        <ProductTable />
                        <ProductTable />
                    </Grid>
                </Grid>
            </div>
        )
    }
}



export default Prendas;