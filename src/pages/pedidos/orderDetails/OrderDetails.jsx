import React, {Component} from 'react'
import {
    Paper,
    Grid,
    Typography
} from '@material-ui/core'
import HeaderLayout from '../../../componets/headerLayout/HeaderLayout';
import OrderDetailCard from './OrderDetailCard';
import ShippingInfoCard from './ShippingInfoCard';


class OrderDetails extends Component{
    render(){
        return(
            <div>
                <HeaderLayout>
                    <Typography color="inherit" component="h2" variant="h1">A0042</Typography>
                </HeaderLayout>
                <Grid container spacing={16}>
                    <Grid item xs={9}>
                        <Paper style={{padding: 16}}>
                            <p>Hola mundo</p>
                            <p>Hola mundo</p>
                            <p>Hola mundo</p>
                            <p>Hola mundo</p>
                            <p>Hola mundo</p>
                            <p>Hola mundo</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                       
                            <OrderDetailCard />
                       
                        
                            <ShippingInfoCard />
                       
                    </Grid>
                </Grid>
            </div>
        )
    }
}


export default OrderDetails