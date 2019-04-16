import React, {Component} from 'react'
import {
    Paper,
    Grid,
    Typography
} from '@material-ui/core'
import HeaderLayout from '../../../componets/headerLayout/HeaderLayout';
import OrderDetailCard from './OrderDetailCard';
import ShippingInfoCard from './ShippingInfoCard';
import PaymentSummary from './PaymentSummary'
import OrderProductTable from './OrderProductTable';


class OrderDetails extends Component{
    componentDidMount(){
        document.title = 'Pedidos | A0042' 
    }

    render(){
        return(
            <div>
                <HeaderLayout>
                    <Typography color="inherit" component="h2" variant="h1">A0042</Typography>
                </HeaderLayout>
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={12} md={9}>
                        <OrderProductTable />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <OrderDetailCard />
                        <ShippingInfoCard />
                        <PaymentSummary/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


export default OrderDetails