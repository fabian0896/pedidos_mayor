import React, { Component, Fragment } from 'react';
import PaymentCard from '../../componets/paymentCard/PaymentCard';
import { Grid, Paper } from '@material-ui/core';
import Header from '../../componets/headerLayout/HeaderLayout'
import SearchBar from '../../componets/searchBar/SearchBar'
import AddPaymentModal from './AddPaymentModal';
import { getPayments } from '../../lib/firebaseService'
import { searchPayment } from '../../lib/searchService'
import Loader from '../../componets/loader/Loader';
import { Search as SearchIcon } from '@material-ui/icons'
import NotFound from '../../componets/notFound/NotFound';

class Pagos extends Component{
    
    state={
        modalOpen: false,
        payments: [],
        searchResults: null,
        isSearching: false,
        loadingSearch: false,
    }

    handleOpenModal = ()=>{
        this.setState({modalOpen: true})
    }

    handleCloseModal = async (event, reason, data)=>{
        if(data){
            this.setState({payments: data})
        }
        this.setState({modalOpen: false})
        return
    }


    async componentDidMount(){
        document.title = "Pagos"
        const payments = await getPayments()
        this.setState({payments})
        return
    }


    getPayments = async ()=>{
        const payments = await getPayments()
        this.setState({payments})
        return
    }

    handleSearch = async (event, value)=>{
        if(!value){
            this.setState({searchResults: null, isSearching: false, loadingSearch: false})
            return
        }
        this.setState({isSearching: true, loadingSearch: true})
        const search = await searchPayment(value)
        this.setState({loadingSearch: false, searchResults: search})
        console.log(search)
        return
    }
    
    render(){

        const { modalOpen, payments, loadingSearch, isSearching, searchResults } = this.state
        const searchList = searchResults? searchResults : payments


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
                        handleSubmit={this.handleSearch}
                    />
                </Header>
                <Fragment>
                    {
                        isSearching && loadingSearch &&
                        <Paper>
                            <Loader
                                floating 
                                loadingText="Buscando el pago..."
                                successText=""
                                Icon={SearchIcon}
                                success={false}
                                loading={true}
                            />
                        </Paper>
                    }
                    {
                        (!loadingSearch && !isSearching && !searchList.length) &&
                        <NotFound 
                            title="No hay pagos para mostrar"
                            message="Cuando agregues un pago lo veras en esta zona ;)" />
                    }
                    {
                        (isSearching && !loadingSearch && !searchList.length) &&
                        <NotFound 
                            title="No se encontraron resultados :("
                            message="No se encontraron resultados para este termino, intenta utiliar otro criterio de busqueda ;) " />
                    }
                    {
                        !loadingSearch && searchList.length>0 &&
                        <Grid container spacing={24}>
                            {
                                searchList.map((payment)=>{
                                    return(
                                        <Grid key={payment.id} item xs={12} sm={6} md={4} xl={3}>
                                            <PaymentCard onUpdate={this.getPayments} payment={payment} />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    }
                </Fragment>
            </div>
        )
    }
}



export default Pagos;