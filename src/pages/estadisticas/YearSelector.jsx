import React, { useState, useCallback, useEffect } from 'react'
import { withStyles, IconButton, Typography } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import moment from 'moment'

const YearSelector = withStyles(theme=>({
    root:{
        display: 'flex',
        color: '#FFF',
        alignItems: 'center'
    },
    text:{
        flex: 1,
        margin: `0 ${theme.spacing.unit*2}px`
    }
}))(({classes, getYear, disableNext, disablePrevius})=>{
    const [year, setYear] =  useState(()=>moment().year())
    const handleAdd = useCallback(()=>{
        setYear(value => value+1)   
    },[])
    const handleReduce = useCallback(()=>{
        setYear(value => value-1)
    },[])

    useEffect(()=>{
        getYear && getYear(year)
    },[year])
    return(
        <div className={classes.root}>
            <IconButton disabled={disablePrevius} onClick={handleReduce} color="inherit">
                <KeyboardArrowLeft fontSize="large"/>
            </IconButton>
            <Typography
                align="center" 
                className={classes.text} 
                color="inherit" 
                variant="h1">
                    {year}
            </Typography>
            <IconButton disabled={disableNext} onClick={handleAdd} color="inherit">
                <KeyboardArrowRight fontSize="large" />
            </IconButton>
        </div>
    )
})


export default YearSelector


