import React from 'react'
import { withStyles } from '@material-ui/core';
import { Paper, Typography, Divider  } from '@material-ui/core'
import NumberFormat from 'react-number-format';
import moment from 'moment'
import { limitName } from '../../lib/utilities'
import { ORDER_STATUS } from '../../lib/enviroment'


const styles = theme =>({
    root:{
        //height: 200,
        display: 'inline-flex',
        overflow: 'hidden',
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
    flag:{
        height: 25,
        borderRadius: 4,
        boxShadow: theme.shadows[1]
    }
})

const status = {
    ...ORDER_STATUS
}

function OrderResume(props){
    const { classes, width, order, client, onClick } = props
    const date = moment(order.createdAt.seconds*1000).format('DD/MM/YYYY')
    const country = client.country.translations.es || client.country
    
    let myWidth = '100%'
    if(width){
        myWidth = width
    }

    return(
        <Paper style={{width: myWidth}} className={classes.root}>
            <div onClick={onClick} className={classes.header}>
                <Typography align="center" color="inherit" component="h6" variant="h5">{order.serialCode}</Typography>
                <Typography align="center" color="inherit" component="p" variant="overline">Prendas</Typography>    
                <Typography className={classes.productNumber} align="center" color="inherit" component="p" variant="overline">{order.totalProducts}</Typography>    
            </div>
            <div className={classes.content}>
                <div className={classes.contentHeader}>
                    <div>
                        <Typography component="span" variant="h6">{limitName(client.name)}</Typography>
                        <Typography component="span" variant="subtitle2" color="textSecondary">{`${client.city}, ${country}`}</Typography>
                    </div>
                    <div>
                        <img className={classes.flag} src={client.country.flag} alt={client.country.name}/>
                    </div>
                </div>
                <Divider/>
                <div className={classes.info}>
                    <div className={classes.basicInfo}>
                        <Typography variant="body2" color="textSecondary">Estao:</Typography>
                        <Typography gutterBottom  variant="body1">{status[order.state]}</Typography>
                        
                        <Typography  variant="body2" color="textSecondary">Fecha:</Typography>
                        <Typography  gutterBottom variant="body1">{date}</Typography>

                        <Typography  variant="body2" color="textSecondary">Encargado:</Typography>
                        <Typography  variant="body1">Fabian David</Typography>
                    </div>
                    <div className={classes.moneyInfo}>
                        <Typography align="right" variant="body2" color="textSecondary">Saldo:</Typography>
                        <NumberFormat 
                        value={order.balance || 0} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={`$`} 
                        renderText={value =>( 
                            <Typography gutterBottom align="right" variant="body1">{value}</Typography>
                        )} />
                        
                        <Typography align="right" variant="body2" color="textSecondary">Pagado:</Typography>
                        <NumberFormat 
                            value={order.total} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={`$`} 
                            renderText={value =>( 
                                <Typography gutterBottom align="right" variant="body1">{value}</Typography>
                                )} />
                        
                        <Typography align="right" variant="body2" color="textSecondary">Total</Typography>
                        <NumberFormat 
                        value={order.total} 
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



export default withStyles(styles)(OrderResume)