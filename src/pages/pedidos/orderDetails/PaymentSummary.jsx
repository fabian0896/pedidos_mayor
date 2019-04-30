import React, {Fragment} from 'react'
import { Paper, withStyles, Typography } from '@material-ui/core';
import NumberFormat from 'react-number-format';



const MoneyValue = ({amount, children})=>(
    <NumberFormat 
        value={amount} 
        displayType={'text'} 
        thousandSeparator={true} 
        prefix={'$'} 
        renderText={value => (
            React.cloneElement(children, {
                children: value
            })
        )}
        />
)


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
    const { classes, data } = props

    const payments = Object.keys(data.payments).map(id=>data.payments[id])

    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography color="inherit" align="center" variant="h6">PAGOS</Typography>
            </div>

            <Typography color="textSecondary" align="center" variant="subtitle2">Total</Typography>
              <MoneyValue amount={data.total}>
                <Typography align="center" variant="h5"></Typography>
            </MoneyValue>  

            <div className={classes.content}>
                <div>
                    <Typography align="left" color="textSecondary" variant="body2">Prendas</Typography>
                    <MoneyValue amount={data.total}>
                        <Typography gutterBottom align="left" variant="body1">$380.000</Typography>
                    </MoneyValue>

                    <Typography align="left" color="textSecondary" variant="body2">Envio</Typography>
                    <Typography gutterBottom align="left" variant="body1">$20.000</Typography>

                    <Typography align="left" color="textSecondary" variant="body2">Total(COP)</Typography>
                    <Typography align="left" variant="body1">$400.000</Typography>
                </div>
                <div >
                    {
                        payments.map((payment, index)=>{
                            return(
                                <Fragment key={payment.id}>
                                    <Typography align="right" color="textSecondary" variant="body2">Pago {index+1}</Typography>
                                    <MoneyValue amount={payment.value}>
                                        <Typography gutterBottom align="right" variant="body1"></Typography>
                                    </MoneyValue>
                                </Fragment>  
                            )
                        })
                    }
                </div>
            </div>
            <div className={classes.balance}>
                <Typography color="inherit" align="center" variant="subtitle1">Saldo</Typography>
                <MoneyValue amount={data.balance} >
                    <Typography color="inherit" align="center" variant="h6"></Typography>
                </MoneyValue>
                <Typography align="center" color="inherit" variant="overline">$15 (USD)</Typography>
            </div>

        </Paper>
    )
}

export default withStyles(styles)(PaymentSummary)