import React, { useEffect, useState, useCallback } from 'react'
import { Grid } from '@material-ui/core';
import ShippingCard from '../../componets/shippingCard/ShippingCard';
import Header from '../../componets/headerLayout/HeaderLayout'
import SearchBar from '../../componets/searchBar/SearchBar'
import { getAllShipments, getShipmentsWithoutTrackingNumber } from '../../lib/firebaseService'
import PendingShippings from './PendingShippings';
import { searchShipping } from '../../lib/searchService'

const useFetchData = (fn) =>{
    const [data, setData] =  useState([])
   
    function getData(value){
        if(!value){
            fn().then((data)=>{
                setData(data)
            })
        }else{
            setData(value)
        }
    }
    useEffect(()=>{
        getData()
    }, [])
    return [data, getData]
}


function Shipping(props){

    const handleAdd = () =>{
        props.history.push('/envios/nuevo')
    }


    
    const [shipments, updateShipments] =  useFetchData(getAllShipments)
    const [pendig, updatePending] = useFetchData(getShipmentsWithoutTrackingNumber)
    

    const handleSubmit = useCallback(async (event, value)=>{
        if(value){
            const res = await searchShipping(value)
            updateShipments(res)
        }else{
            updateShipments()
        }
        return
   }) 


    const handleUpdate = useCallback(()=>{
        updatePending()
        updateShipments()
    }, [])

    return(
        <div>
            <Header>
                <SearchBar 
                    handleAdd={handleAdd}
                    handleSubmit={handleSubmit}
                />
            </Header>
            <Grid container spacing={8}>   
                <Grid item xs={12} sm={12} md={9}>
                    <Grid container spacing={24}>
                    {
                        shipments.map((shipping, index)=>(
                            <Grid key={index} item xs={12} sm={6} md={4} xl={2}>
                                <ShippingCard
                                    onUpdate={handleUpdate}
                                    shipping={shipping} />
                            </Grid> 
                        ))
                    }
                    </Grid>
                </Grid>
                
                <Grid item xs={12} sm={12} md={3}>
                    <PendingShippings data={pendig}/>
                </Grid>
            </Grid>
        </div>
    )
}


export default Shipping