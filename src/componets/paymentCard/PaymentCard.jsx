import React from 'react'
import { withStyles, Paper, Typography, Divider } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'

const PaymentCard = withStyles(theme=>({
    root: {
        height: '100%',
        overflow: 'hidden'
    },
    infoContainer:{
        display: 'flex',
        '& div:first-child':{
            flex: 1,
            paddingRight: theme.spacing.unit,
        }
    },
    resume:{
        padding: `${theme.spacing.unit*2}px ${theme.spacing.unit*2}px ${theme.spacing.unit*4}px` 
    },
    divider:{
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit*2,
        marginRight: theme.spacing.unit*2,
    },
    secondaryInfo:{
        margin: `${theme.spacing.unit}px ${theme.spacing.unit*2}px` 
    },
    date:{
        lineHeight: 1.4
    },
    detailInfo:{
        background: '#97a565',
        padding: theme.spacing.unit*2,
        color: '#FFF',
        boxShadow: theme.shadows[4]
    },
    secondaryText:{
        opacity: .6
    }
}))(({payment, classes})=>(
    <Paper className={classes.root}>
        <div className={classes.infoContainer}>
            <div>
                <div className={classes.resume}>
                    <Typography color="inherit" variant="h5">$100.000</Typography>
                    <Typography variant="subtitle2" color="textSecondary">PayPal</Typography>
                    <Typography variant="subtitle2" color="textSecondary">E45678459</Typography>
                </div>
                    <Divider className={classes.divider}/>
                <div className={classes.secondaryInfo}>
                    <Typography className={classes.date} color="textSecondary" variant="overline">Fabian David Dueñas</Typography>
                    <Typography className={classes.date} color="textSecondary" variant="overline">14/17/2019</Typography>
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

