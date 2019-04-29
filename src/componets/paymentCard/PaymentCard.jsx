import React from 'react'
import { withStyles, Paper, Typography, Divider } from '@material-ui/core'


const PaymentCard = withStyles(theme=>({
    root: {
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transition: '.2s',
        '&:before':{
            content: '""',
            position: 'absolute',
            display: 'block',
            height: '100%',
            width: '100%',
            background: '#97a565',
            top: 0,
            left: 0,
            transform: 'translateX(100%)',
            transition: '.3s',
            zIndex: 1
        },
        '&:hover':{
            boxShadow: theme.shadows[20],
        },
        '&:hover:before':{
            transform: 'translateX(0%)',
        },
        '&:hover $resume':{
            color: '#FFF'
        },
        '&:hover $detailInfo':{
            boxShadow: 'none'
        },
        '&:hover $secondaryInfo':{
            color: '#FFF'
        },
        '&:hover $date':{
            color: '#FFF',
            opacity: 1,
        },
        '&:hover $secondaryText':{
            opacity: .8
        }
    },
    infoContainer:{
        display: 'flex',
        '& div:first-child':{
            flex: 1,
            paddingRight: theme.spacing.unit,
        }
    },
    resume:{
        position: 'relative',
        transition: '.3s',
        zIndex: 2,
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
        margin: `${theme.spacing.unit}px ${theme.spacing.unit*2}px` 
    },
    date:{
        lineHeight: 1.4,
        opacity: .5
    },
    detailInfo:{
        transition: '.2s',
        position: 'relative',
        zIndex: 2,
        background: '#97a565',
        padding: theme.spacing.unit*2,
        color: '#FFF',
        boxShadow: theme.shadows[4]
    },
    secondaryText:{
        opacity: .55
    }
}))(({payment, classes})=>(
    <Paper className={classes.root}>
        <div className={classes.infoContainer}>
            <div>
                <div className={classes.resume}>
                    <Typography color="inherit" variant="h5">$100.000</Typography>
                    <Typography className={classes.secondaryText} variant="subtitle2" color="inherit">PayPal</Typography>
                    <Typography className={classes.secondaryText} variant="subtitle2" color="inherit">E45678459</Typography>
                </div>
                    <Divider className={classes.divider}/>
                <div className={classes.secondaryInfo}>
                    <Typography className={classes.date} color="inherit" variant="overline">Fabian David Dueñas</Typography>
                    <Typography className={classes.date} color="inherit" variant="overline">14/17/2019</Typography>
                </div>
            </div>
            <div className={classes.detailInfo}>
                
                <Typography gutterBottom align="right" color="inherit" variant="h5">A016</Typography>

                <Typography className={classes.secondaryText} align="right" color="inherit" variant="body2">Total del pedido</Typography>
                <Typography gutterBottom align="right" color="inherit" variant="body1">500.000</Typography>
                
                <Typography className={classes.secondaryText} align="right" color="inherit" variant="body2">saldo</Typography>
                <Typography gutterBottom align="right" color="inherit" variant="body1">400.000</Typography>
            </div>
        </div>
    </Paper>
))



export default PaymentCard

