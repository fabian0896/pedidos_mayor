import React from 'react'
import { withStyles } from '@material-ui/core';
import { Paper, Typography, Divider  } from '@material-ui/core'
import NumberFormat from 'react-number-format';
import moment from 'moment'
import { limitName } from '../../lib/utilities'
import { STATES } from '../../lib/enviroment'
import classNames from 'classnames'
import { green, amber } from '@material-ui/core/colors'
import { connect } from 'react-redux'

import { useGetFlag } from '../../hooks';

const styles = theme =>({
    root:{
        //height: 200,
        display: 'flex',
        overflow: 'hidden',
        height: '100%'
    },
    header:{
        background: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing.unit*2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: '.2s',
        '&:hover':{
            boxShadow: theme.shadows[20]
        }
    },
    productNumber:{
        marginTop: -12
    },
    content:{
        flex: 1,
        padding: `${theme.spacing.unit*2}px ${theme.spacing.unit*2}px`
    },
    contentHeader:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.unit
    },
    info:{
        marginTop: theme.spacing.unit,
        display: 'flex',
    },
    basicInfo:{
        flex: 1,
    },
    moneyInfo:{

    },
    pending:{
        background: theme.palette.grey[500]
    },
    production:{
        background: theme.palette.primary.dark
    },
    readyToShip:{
        background: amber[700]  
    },
    shipped:{
        background: green[600]
    },
    flag:{
        height: 25,
        borderRadius: 4,
        boxShadow: theme.shadows[1]
    }
})


function OrderResume(props){
    const { classes, order, client, onClick, seller } = props
    const date = moment(order.createdAt.seconds*1000).format('DD/MMMM/YYYY')
    const country = "NONE" //client.country.translations.es || client.country
    
    const flag = useGetFlag(client);

    return(
        <Paper  className={classes.root}>
            <div onClick={onClick} className={classNames(classes.header, classes[order.state])}>
                <Typography align="center" color="inherit" component="h6" variant="h5">{order.serialCode}</Typography>
                <Typography align="center" color="inherit"  variant="body2">({order.consecutive? order.consecutive : '---'})</Typography>
                <Typography align="center" color="inherit" component="p" variant="overline">Prendas</Typography>    
                <Typography className={classes.productNumber} align="center" color="inherit" component="p" variant="overline">{order.totalProducts}</Typography>    
            </div>
            <div className={classes.content}>
                <div className={classes.contentHeader}>
                    <div>
                        <Typography component="span" variant="h6">{limitName(client? client.name : "none")}</Typography>
                        <Typography component="span" variant="subtitle2" color="textSecondary">{`${client? client.city:"none"}, ${country}`}</Typography>
                    </div>
                    <div>
                        <img className={classes.flag} src={flag} alt={client? client.country.name : "none"}/>
                    </div>
                </div>
                <Divider/>
                <div className={classes.info}>
                    <div className={classes.basicInfo}>
                        <Typography variant="body2" color="textSecondary">Estado:</Typography>
                        <Typography gutterBottom  variant="body1">{STATES[order.state].short}</Typography>
                        
                        <Typography  variant="body2" color="textSecondary">Fecha:</Typography>
                        <Typography  gutterBottom variant="body1">{date}</Typography>

                        <Typography  variant="body2" color="textSecondary">Encargado:</Typography>
                        <Typography  variant="body1">{seller.name}</Typography>
                    </div>
                    <div className={classes.moneyInfo}>
                        <Typography align="right" variant="body2" color="textSecondary">Saldo:</Typography>
                        <NumberFormat 
                        value={parseFloat(order.balance || 0).toFixed(1)} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={`$`} 
                        renderText={value =>( 
                            <Typography gutterBottom align="right" variant="body1">{value}</Typography>
                        )} />
                        
                        <Typography align="right" variant="body2" color="textSecondary">Pagado:</Typography>
                        <NumberFormat 
                            value={order.totalPayments || 0} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={`$`} 
                            renderText={value =>( 
                                <Typography gutterBottom align="right" variant="body1">{value}</Typography>
                                )} />
                        
                        <Typography align="right" variant="body2" color="textSecondary">Total</Typography>
                        <NumberFormat 
                            value={parseFloat(order.total + (order.shipmentsPrice || 0)).toFixed(1)} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={`$`} 
                            renderText={value =>( 
                                <Typography component="span" variant="h6">{value}</Typography>
                            )} />
                    </div> 
                </div>
            </div>
        </Paper>
    )
}


const mapStateToProps = (state, props)=>{
    return{ 
        seller: {}//state.sellers[props.client.seller]
    }
}


export default connect(mapStateToProps)(withStyles(styles)(OrderResume))