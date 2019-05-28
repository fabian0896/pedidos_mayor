import React from 'react'
import { withStyles, Paper, Typography } from '@material-ui/core';
import classNames from 'classnames'


const MonthCard = withStyles(theme=>({
    root:{
        //height: 100,
        overflow: 'hidden',
        cursor: 'pointer',
        background: theme.palette.primary.main,
        display: 'flex',
        color: theme.palette.primary.contrastText,
        '&:hover':{
            background: theme.palette.primary.dark,
            boxShadow: theme.shadows[7]
        }
    },
    header:{
        padding: theme.spacing.unit*2,
        height: '100%',
        //color: theme.palette.primary.contrastText
    },
    content:{
        flex: 1,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing.unit*2
    },
    desable:{
        background: theme.palette.grey[400],
        display: 'flex',
        overflow: 'hidden',
        color: theme.palette.grey[100]
    }
}))(({classes, month, monthName, handleMonthClick})=>{
    return(
        <Paper onClick={month? handleMonthClick(month): ()=>{}} className={classNames({[classes.root]: Boolean(month)}, {[classes.desable]: !Boolean(month) })}>
            <div className={classes.header}>
                <Typography color="inherit" variant="h4">{monthName}</Typography>
            </div>
            <div className={classes.content}>
                <Typography style={{opacity: .7}} color="inherit" align="right">Pedidos</Typography>
                <Typography variant="body2" gutterBottom color="inherit" align="right">{month? month.totalOrders : '---'}</Typography>
                
                <Typography style={{opacity: .7}} color="inherit" align="right">Prendas</Typography>
                <Typography variant="body2" color="inherit" align="right">{month? month.totalProducts : '---'}</Typography>
            </div>
        </Paper>
    )
})


export default MonthCard