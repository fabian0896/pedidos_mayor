import React from 'react'
import { withStyles, Paper, Typography } from '@material-ui/core';
import MoneyText from '../../componets/moneyText/MoneyText'
import { connect } from 'react-redux'

const Item = withStyles(theme =>({
    root:{
        padding: `${theme.spacing.unit}px ${theme.spacing.unit*2}px`,
        display: 'flex',
        alignItems: 'center',
        transition: '.2s',
        '&:first-child':{
            marginTop: theme.spacing.unit
        },
        '&:last-child':{
            marginBottom: theme.spacing.unit
        },
        '& > :first-child':{
            flex: 1
        },
        '&:hover':{
            background: theme.palette.grey[300]
        }
    }
}))(({classes, order, client})=>{
    return(
        <div className={classes.root}>
            <div>
                <Typography style={{fontWeight: 500, lineHeight: 1.2}} variant="subtitle1">{order.serialCode}</Typography>
                <Typography color="textSecondary">{client.name}</Typography>
            </div>
            <MoneyText currency={order.currency} >{parseFloat(order.balance).toFixed(1)}</MoneyText>
        </div>
    )
})



const OrderWithBalance = withStyles(theme=>({
    root:{
        overflow: 'hidden'
    },
    header:{
        padding: theme.spacing.unit*2,
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText
    },
    content:{
        minHeight: 100,

    },
    noContet:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        padding: theme.spacing.unit*2
    }
}))(({classes,data, clients})=>{

    return(
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h6" color="inherit">PAGOS PENDIENTES</Typography>
            </div>
            {
                !!data.length?
                <div className={classes.content}>
                    {
                        data.map(order =>(<Item client={clients[order.clientId]} key={order.id} order={order}/>))
                    }
                </div>
                :
                <div className={classes.noContet}>
                    <Typography align="center" variant="overline">No hay pedidos con pagos pendientes</Typography>
                </div>
            }
        </Paper>
    )
})

function mapStateToProps(state){
    return{
        clients: state.clients.all
    }
}

export default connect(mapStateToProps)(OrderWithBalance)