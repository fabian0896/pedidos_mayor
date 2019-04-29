import React, { Component } from 'react';
import PaymentCard from '../../componets/paymentCard/PaymentCard';
import { Grid } from '@material-ui/core';
import Header from '../../componets/headerLayout/HeaderLayout'
import SearchBar from '../../componets/searchBar/SearchBar'
import AddPaymentModal from './AddPaymentModal';

class Pagos extends Component{
    
    state={
        modalOpen: false
    }

    handleOpenModal = ()=>{
        this.setState({modalOpen: true})
    }

    handleCloseModal = ()=>{
        this.setState({modalOpen: false})
    }

    handleAddPayment = ()=>{

    }

    componentDidMount(){

    }
    
    render(){

        const { modalOpen } = this.state

        return(
            <div>
                <AddPaymentModal
                    open={modalOpen}
                    onClose={this.handleCloseModal}
                    title="Agregar Pago"
                />


                <Header>
                    <SearchBar
                        handleAdd={this.handleOpenModal}
                        handleSubmit={()=>{}}
                    />
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