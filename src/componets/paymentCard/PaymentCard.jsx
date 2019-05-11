import React from 'react'
import { withStyles, Paper, Typography, Divider } from '@material-ui/core'
import NumberFormat from 'react-number-format';
import moment from 'moment'
import { limitName } from '../../lib/utilities'
import { getPaymentStyles } from '../../lib/enviroment'

const MoneyValue = ({amount, children, currency})=>(
    <NumberFormat 
        value={amount} 
        displayType={'text'} 
        thousandSeparator={true} 
        prefix={`${currency !== 'COP'? currency + " " : ''}$`} 
        renderText={value => (
            React.cloneElement(children, {
                children: value
            })
        )}
    />
)


const PaymentCard = withStyles((theme)=>({
    root: {
        //display: 'inline-block',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transition: '.2s',
        /* '&:before':{
            content: '""',
            position: 'absolute',
            display: 'block',
            height: '100%',
            width: '100%',
            background: `#97a565`,
            top: 0,
            left: 0,
            transform: 'translateX(100%)',
            transition: '.3s',
            zIndex: 1
        }, */
        '&:hover':{
            boxShadow: theme.shadows[20],
        },
        '&:hover:before':{
            transform: 'translateX(0%)',
        },
        '&:hover $resume *':{
            color: 'inherit'
        },
        '&:hover $detailInfo':{
            boxShadow: 'none'
        },
        '&:hover $secondaryInfo *':{
            color: 'inherit'
        },
        '&:hover $date':{
            color: 'inherit',
            opacity: 1,
        },
        '&:hover $secondaryText':{
            opacity: .8
        },
        '&:hover $hoverObject':{
            transform: 'translateX(0%)',
        },
    },
    hoverObject:{
        position: 'absolute',
        display: 'block',
        height: '100%',
        width: '100%',
        //background: `#97a565`,
        top: 0,
        left: 0,
        transform: 'translateX(100%)',
        transition: '.3s',
        zIndex: 1
    },
    infoContainer:{
        display: 'flex',
        height: '100%',
        '& div:first-child':{
            flex: 1,
            paddingRight: theme.spacing.unit,
        }
    },
    resume:{
        position: 'relative',
        transition: '.3s',
        zIndex: 2,
        '& > *':{
            color: 'black',
            transition: '.3s',
        },
        padding: `${theme.spacing.unit*2}px ${theme.spacing.unit*2}px ${theme.spacing.unit*4}px` 
    },
    divider:{
        position: 'relative',
        zIndex: 2,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit*2,
        marginRight: theme.spacing.unit*2,
    },
    secondaryInfo:{
        position: 'relative',
        zIndex: 2,
        margin: `${theme.spacing.unit}px ${theme.spacing.unit*2}px`,
        '& > *':{
            color: 'black'
        }
    },
    date:{
        lineHeight: 1.4,
        opacity: .5,
        '& > *':{
            color: 'black'
        },
        transition: '.3s'
    },
    detailInfo:{
        transition: '.2s',
        position: 'relative',
        zIndex: 2,
        //background: '#97a565',
        padding: theme.spacing.unit*2,
        color: '#FFF',
        boxShadow: theme.shadows[4]
    },
    secondaryText:{
        opacity: .55
    }
}))(({payment, classes})=>{
    const paymentStyle = getPaymentStyles(payment.paymentMethod)
    return(
        <Paper className={classes.root}>
            <div style={{background: paymentStyle.background}} className={classes.hoverObject}></div>
            <div className={classes.infoContainer}>
                <div>
                    <div style={{color: paymentStyle.color}} className={classes.resume}>
                        <MoneyValue currency={payment.currency} amount={payment.value}>
                            <Typography color="inherit" variant="h5"></Typography>
                        </MoneyValue>
                        <Typography className={classes.secondaryText} variant="subtitle2" >{payment.paymentMethod}</Typography>
                        <Typography className={classes.secondaryText} variant="subtitle2" color="inherit">{payment.reference}</Typography>
                    </div>
                        <Divider className={classes.divider}/>
                    <div style={{color: paymentStyle.color}} className={classes.secondaryInfo}>
                        <Typography className={classes.date} color="inherit" variant="overline">{limitName(payment.clientName)}</Typography>
                        <Typography 
                            className={classes.date} 
                            color="inherit" 
                            variant="overline">
                                {moment(payment.createdAt.seconds*1000).format('DD/MM/YYYY')}
                        </Typography>
                    </div>
                </div>
                <div style={{background: paymentStyle.background, color: paymentStyle.color}} className={classes.detailInfo}>
                    
                    <Typography gutterBottom align="right" color="inherit" variant="h5">{payment.orderSerialCode}</Typography>

                    <Typography className={classes.secondaryText} align="right" color="inherit" variant="body2">Total del pedido</Typography>
                    <MoneyValue currency={payment.currency} amount={payment.totalOrder}>
                        <Typography gutterBottom align="right" color="inherit" variant="body1"></Typography>
                    </MoneyValue>
                    
                    <Typography className={classes.secondaryText} align="right" color="inherit" variant="body2">saldo</Typography>
                    <MoneyValue currency={payment.currency} amount={payment.orderBalance}>
                        <Typography gutterBottom align="right" color="inherit" variant="body1"></Typography>
                    </MoneyValue>
                </div>
            </div>
        </Paper>
)})



export default PaymentCard

