import React from 'react'
import { Paper, withStyles, Typography, Divider } from '@material-ui/core';


const styles = theme => ({
    root: {
        marginBottom: theme.spacing.unit * 2,
        overflow: 'hidden'
    },
    header: {
        padding: theme.spacing.unit*2,
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText,
        marginBottom: theme.spacing.unit*2,
    },
    content: {
        //marginTop: theme.spacing.unit*2,
        padding: theme.spacing.unit * 2,
        display: 'flex',
        '& div':{
            flex: 1
        }
    },
    divider: {
        marginBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2
    },
    balance: {
        padding: theme.spacing.unit*2,
        background: theme.palette.grey[300],
        //color: theme.palette.secondary.contrastText
    }
})


function PaymentSummary(props) {
    const { classes } = props
    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography color="inherit" align="center" variant="h6">PAGOS</Typography>
            </div>

            <Typography color="textSecondary" align="center" variant="subtitle2">Total</Typography>
            <Typography align="center" variant="h5">$400.000</Typography>

            <div className={classes.content}>
                <div>
                    <Typography align="left" color="textSecondary" variant="body2">Prendas</Typography>
                    <Typography gutterBottom align="left" variant="body1">$380.000</Typography>

                    <Typography align="left" color="textSecondary" variant="body2">Envio</Typography>
                    <Typography gutterBottom align="left" variant="body1">$20.000</Typography>

                    <Typography align="left" color="textSecondary" variant="body2">Total(COP)</Typography>
                    <Typography align="left" variant="body1">$400.000</Typography>
                </div>
                <div >
                    <Typography align="right" color="textSecondary" variant="body2">Pago 1</Typography>
                    <Typography gutterBottom align="right" variant="body1">$300.000</Typography>

                    <Typography align="right" color="textSecondary" variant="body2">Pago 2</Typography>
                    <Typography align="right" variant="body1">$50.000</Typography>
                </div>
            </div>
            <div className={classes.balance}>
                <Typography color="inherit" align="center" variant="subtitle1">Saldo</Typography>
                <Typography color="inherit" align="center" variant="h6">$50.000</Typography>
                <Typography align="center" color="inherit" variant="overline">$15 (USD)</Typography>
            </div>

        </Paper>
    )
}

export default withStyles(styles)(PaymentSummary)