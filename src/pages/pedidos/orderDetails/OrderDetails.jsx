import React, {Component} from 'react'
import {
    Paper,
    Grid
} from '@material-ui/core'
import HeaderLayout from '../../../componets/headerLayout/HeaderLayout';
import OrderDetailCard from './OrderDetailCard';
import ShippingInfoCard from './ShippingInfoCard';


class OrderDetails extends Component{
    render(){
        return(
            <div>
                <HeaderLayout>

                </HeaderLayout>
                <Grid container spacing={16}>
                    <Grid item xs={9}>
                        <Paper>
                            <p>Hola mundo</p>
                            <p>Hola mundo</p>
                            <p>Hola mundo</p>
                            <p>Hola mundo</p>
                            <p>Hola mundo</p>
                            <p>Hola mundo</p>
                        </Paper>
                    </Grid>
                    <Grid container spacing={16} item xs={3}>
                        <Grid item xs={12}>
                            <OrderDetailCard />
                        </Grid>
                        <Grid item xs={12}>
                            <ShippingInfoCard />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


export default OrderDetails