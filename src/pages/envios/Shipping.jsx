import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core';
import ShippingCard from '../../componets/shippingCard/ShippingCard';
import Header from '../../componets/headerLayout/HeaderLayout'
import SearchBar from '../../componets/searchBar/SearchBar'
import { getAllShipments } from '../../lib/firebaseService'


const useFetchData = (fn) =>{
    const [data, setData] =  useState([])
   
    async function getData(){
        const data = await fn()
        setData(data)
    }
    useEffect(()=>{
        getData()
    }, [])
    return data
}


function Shipping(props){

    const handleAdd = () =>{
        props.history.push('/envios/nuevo')
    }

    const shipments =  useFetchData(getAllShipments)


    return(
        <div>
            <Header>
                <SearchBar 
                    handleAdd={handleAdd}
                />
            </Header>
            <Grid container spacing={16}>   
                <Grid item xs={12} sm={12} md={9}>
                    <Grid container spacing={24}>
                    {
                        shipments.map((shipping, index)=>(
                            <Grid key={index} item xs={12} sm={6} md={4} xl={2}>
                                <ShippingCard  shipping={shipping} />
                            </Grid> 
                        ))
                    }
                    </Grid>
                </Grid>
                
                <Grid item xs={12} sm={12} md={3}>
                    
                </Grid>
            </Grid>
        </div>
    )
}


export default Shipping