import React, { useEffect, useState, useCallback, Fragment } from 'react'
import { Grid, Paper} from '@material-ui/core';
import ShippingCard from '../../componets/shippingCard/ShippingCard';
import Header from '../../componets/headerLayout/HeaderLayout'
import SearchBar from '../../componets/searchBar/SearchBar'
import { getAllShipments, getShipmentsWithoutTrackingNumber } from '../../lib/firebaseService'
import PendingShippings from './PendingShippings';
import { searchShipping } from '../../lib/searchService'
import NoFindMessage from '../../componets/noFindMessage/NoFindMessage';
import NotFound from '../../componets/notFound/NotFound';
import { Search as SearchIcon } from '@material-ui/icons'
import Loader from '../../componets/loader/Loader';

const useFetchData = (fn) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    function getData(value) {
        setLoading(true)
        if (!value) {
            fn().then((data) => {
                setData(data)
                setLoading(false)
            })
        } else {
            setData(value)
            setLoading(false)
        }
        
    }
    useEffect(() => {
        getData()
    }, [])
    return [data, getData, loading, setLoading]
}


function Shipping(props) {

    const handleAdd = () => {
        props.history.push('/envios/nuevo')
    }

    const [isSearching, setIsSearching] = useState(false)
    const [shipments, updateShipments, loading, setLoading] = useFetchData(getAllShipments)
    const [pendig, updatePending] = useFetchData(getShipmentsWithoutTrackingNumber)

    const handleSubmit = useCallback(async (event, value) => {
        setLoading(true)
        if (value) {
            setIsSearching(true)
            const res = await searchShipping(value)
            updateShipments(res)
        } else {
            setIsSearching(false)
            updateShipments()
        }
        setLoading(false)
        return
    })


    const handleUpdate = useCallback(() => {
        updatePending()
        updateShipments()
    }, [])

    return (
        <div>
            <Header>
                <SearchBar
                    handleAdd={handleAdd}
                    handleSubmit={handleSubmit}
                />
            </Header>
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12} md={9}>
                    <Grid container spacing={24}>
                        {
                            loading?
                            <Grid item xs={12}>
                                <Paper style={{height: 250}}>
                                    <Loader
                                        floating
                                        loading={true}
                                        success={false}
                                        Icon={SearchIcon}
                                        loadingText="Buscando envios..."    
                                        />
                                </Paper>
                            </Grid>
                             :
                             <Fragment>
                                 {
                                     !!shipments.length &&
                                     shipments.map((shipping, index) => (
                                         <Grid key={index} item xs={12} sm={6} md={4} xl={2}>
                                             <ShippingCard
                                                 onUpdate={handleUpdate}
                                                 shipping={shipping} />
                                         </Grid>
                                     ))
                                 }
                                 {
                                     isSearching && !shipments.length &&
                                     <Grid item xs={12}>
                                         <NotFound
                                             title="No se encontraron resultados"
                                             message="no se encontraron envios con los terminos buscados, no dudes en agregar un envio ;)"
                                             />
                                     </Grid>
                                 }
                                 {
                                     !isSearching && !shipments.length &&
                                     <Grid item xs={12}>
                                         <NoFindMessage
                                             message="No se encontraron resultados"
                                             subMessage="no se encontraron envios con los terminos buscados, no dudes en agregar un envio ;)"
                                             callToAction="Agregar Envio"
                                             cta={handleAdd} />
                                     </Grid>
                                 }
                             </Fragment>   
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                    <PendingShippings data={pendig} />
                </Grid>
            </Grid>
        </div>
    )
}


export default Shipping