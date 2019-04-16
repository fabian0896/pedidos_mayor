import React, {Component, Fragment} from 'react'
import {
    Paper,
    Grid,
    Typography,
    withWidth
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
        const { width } = this.props
        return(
            <div>
                <HeaderLayout>
                    <Typography color="inherit" component="h2" variant="h1">A0042</Typography>
                </HeaderLayout>
                {
                    width === 'xs' || width === 'sm'?
                    <Fragment>
                        <OrderDetailCard />
                        <OrderProductTable />
                        <Grid container spacing={16}>
                            <Grid item sm={6} xs={12}>
                                <ShippingInfoCard />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <PaymentSummary/>
                            </Grid>
                        </Grid>
                    </Fragment>
                    :
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

                }
            </div>
        )
    }
}


export default withWidth()(OrderDetails)