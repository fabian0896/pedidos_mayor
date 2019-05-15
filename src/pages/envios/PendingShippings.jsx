import React, { useCallback } from 'react'
import { withStyles, Paper, Typography, Divider } from '@material-ui/core';
import moment from 'moment'
import { withRouter } from 'react-router-dom'


const PendingShippings = withStyles(theme =>({
    root:{
        minHeight: 300,
        padding: `${theme.spacing.unit*2}px 0px`,
    },
    divider:{
        margin: `${theme.spacing.unit}px ${theme.spacing.unit*2}px`
    },
    header:{
        padding: `0px ${theme.spacing.unit*2}px`
    },
    content:{

    },
    item:{
        padding: `${theme.spacing.unit}px ${theme.spacing.unit*2}px`,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: '.2s',
        '& > :first-child':{
            flex: 1
        },
        '&:hover':{
            background: theme.palette.grey[300]
        }
    },
    noPending:{
        display: 'flex',
        alignItems: 'center',
        height: 200,
        padding: theme.spacing.unit*2
    }
}))(({classes, data, history})=>{
    const list = data || []
    
    const handleClick = useCallback((id)=>()=>{
        history.push(`pedidos/${id}`)
    },[])

    return(
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h6" >Pendientes Por Guía</Typography>
            </div>
            <Divider className={classes.divider}/>
            <div className={classes.content}>
                {
                    !!list.length &&
                    list.map(shipping=>(
                        <div onClick={handleClick(shipping.orderId)} className={classes.item} key={shipping.id}>
                            <div>
                                <Typography 
                                    style={{lineHeight: 1.25, fontWeight: 500}} 
                                    variant="subtitle1" >
                                        {shipping.order.label}
                                </Typography>
                                <Typography style={{lineHeight:1.25}} color="textSecondary" >{shipping.company}</Typography>
                                <Typography style={{lineHeight:1.25}} color="textSecondary" >{shipping.totalProducts} Prendas</Typography>
                            </div>
                            <div>
                                <Typography
                                    variant="overline"
                                    color="textSecondary" >
                                    {moment(shipping.createdAt.seconds*1000).format('DD/MM/YYYY')}
                                </Typography>
                            </div>
                        </div>
                    ))
                }
                {
                    !list.length &&
                    <div className={classes.noPending}>
                        <Typography align="center" variant="overline" color="textSecondary" >No hay envios pendientes por guia</Typography>
                    </div>
                }
            </div>
        </Paper>
    )
})


export default withRouter(PendingShippings)
