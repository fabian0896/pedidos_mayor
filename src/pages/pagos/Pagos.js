import React, { Component } from 'react';
import PaymentCard from '../../componets/paymentCard/PaymentCard';
import { Grid } from '@material-ui/core';
import Header from '../../componets/headerLayout/HeaderLayout'


class Pagos extends Component{
    render(){
        return(
            <div>
                <Header>
                    
                </Header>
                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        <PaymentCard />
                    </Grid>
                    <Grid item xs={4}>
                        <PaymentCard />
                    </Grid>
                    <Grid item xs={4}>
                        <PaymentCard />
                    </Grid>
                    <Grid item xs={4}>
                        <PaymentCard />
                    </Grid>
                    <Grid item xs={4}>
                        <PaymentCard />
                    </Grid>
                    <Grid item xs={4}>
                        <PaymentCard />
                    </Grid>
                    <Grid item xs={4}>
                        <PaymentCard />
                    </Grid>
                    <Grid item xs={4}>
                        <PaymentCard />
                    </Grid>
                    <Grid item xs={4}>
                        <PaymentCard />
                    </Grid>
                </Grid>
            </div>
        )
    }
}



export default Pagos;