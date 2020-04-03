import React, { useState, useCallback, useEffect } from 'react'
import { withStyles, Paper, Typography, IconButton } from '@material-ui/core';
import moment from 'moment'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

const GOAL = 250


const WeekStats = withStyles(theme => ({
    root: {
        marginTop: theme.spacing.unit * 4,
        height: 200,
        
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        [theme.breakpoints.down('xs')]:{
            height: 'auto'
        } 
    },
    header:{
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText,
        padding: theme.spacing.unit*2,
    },
    superContainer:{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: `0 ${theme.spacing.unit}px`
    },
    content: {
        padding:theme.spacing.unit*2,
        flex: 1,
        display: 'flex',
        width: '100%',
        '& > *':{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRight: `1px solid ${theme.palette.divider}`,
            '&:last-child':{
                borderRight: 'none',
                borderBottom: 'none'
            }
        },
        [theme.breakpoints.down('xs')]:{
            flexDirection: 'column',
            padding: `${theme.spacing.unit*2}px ${theme.spacing.unit*4}px`,
            '& > *':{
                height: 50,
                flex: 1,
                padding: `${theme.spacing.unit*2}px 0`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: `1px solid ${theme.palette.divider}`,
                borderRight: `none`,
                '&:last-child':{
                    borderRight: 'none',
                    
                }
            }
        } 
    }
}))(({ classes, year }) => { 

    const defaultWeek = {
        totalOrders: 0,
        totalProducts: 0
    }

    const [weekNumber, setWeekNumber] = useState(()=>moment().week())


    const [week, setWeek] = useState(defaultWeek)
    const [beforeWeek, setBeforeWeek] = useState(null)
    const [AfterWeek, setAfterWeek] = useState(null)

    useEffect(()=>{
        setWeek('weeks' in (year || {}) ? (year.weeks[weekNumber] || defaultWeek) : defaultWeek)
        setBeforeWeek('weeks' in (year || {}) ? (year.weeks[weekNumber - 1] || null) : null)
        setAfterWeek('weeks' in (year || {}) ? (year.weeks[weekNumber + 1] || null) : null)
    },[weekNumber, year])

   
    const addWeek = useCallback(()=>{
        setWeekNumber(value => value + 1)
    })
    const reduceWeek = useCallback(()=>{
        setWeekNumber(value => value - 1)
    })


    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography color="inherit" align="center" variant="h4">SEMANA {weekNumber}</Typography>
            </div>
            <div className={classes.superContainer}>
                <IconButton onClick={reduceWeek} disabled={!beforeWeek && (moment().week() !== weekNumber-1)}>
                    <KeyboardArrowLeft/>
                </IconButton>
                <div className={classes.content}>
                    <div>
                        <Typography variant="h4" >{week.totalOrders}</Typography>
                        <Typography color="textSecondary">Pedidos</Typography>
                    </div>
                    <div>
                        <Typography variant="h4" >{week.totalProducts}</Typography>
                        <Typography color="textSecondary">Prendas</Typography>
                    </div>
                    <div>
                        <Typography variant="h4" >{GOAL - week.totalProducts}</Typography>
                        <Typography color="textSecondary">Falta por vender</Typography>
                    </div>
                </div>
                <IconButton onClick={addWeek} disabled={!AfterWeek}>
                    <KeyboardArrowRight/>
                </IconButton>
            </div>
        </Paper>
    )
})



export default WeekStats