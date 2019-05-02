import React from 'react'
import { Grid } from '@material-ui/core';
import ShippingCard from '../../componets/shippingCard/ShippingCard';
import Header from '../../componets/headerLayout/HeaderLayout'

function Shipping(props){


    return(
        <div>
            <Header>

            </Header>
            <Grid container spacing={16}>
                
                <Grid item xs={12} sm={12} md={9}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6} md={4} xl={2}>
                            <ShippingCard />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} xl={2}>
                            <ShippingCard />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} xl={2}>
                            <ShippingCard />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} xl={2}>
                            <ShippingCard />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} xl={2}>
                            <ShippingCard />
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={12} sm={12} md={3}>
                
                </Grid>
            </Grid>
        </div>
    )
}


export default Shipping