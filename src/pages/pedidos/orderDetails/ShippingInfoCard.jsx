import React, { Fragment } from 'react'
import {
    withStyles,
    Paper,
    Typography,
    Button,
    Collapse,
    Divider
} from '@material-ui/core';
import MoneyText from '../../../componets/moneyText/MoneyText';
import  Title  from '../../../componets/title/Title'






const styles = theme => ({
    root: {
        overflow: 'hidden',
        marginBottom: theme.spacing.unit * 2
    },
    header: {
        padding: theme.spacing.unit*2,
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText,
        marginBottom: theme.spacing.unit,
    },
    content:{
        //padding: theme.spacing.unit * 2,
    },
    divider: {
        margin: theme.spacing.unit * 2,
    },
    actions: {
        padding: theme.spacing.unit*2,
        marginTop: theme.spacing.unit * 2,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    mainInfo:{
        marginTop: theme.spacing.unit*2
    },
    secondaryInfo:{
        display: 'flex',
        '& > *': {
            flex: 1
        }
    },
    shippingList:{
        padding: `0px ${theme.spacing.unit*2}px`,
       
    },
    item:{
        display: 'flex',
        marginBottom: theme.spacing.unit*2,
        '& > :first-child':{
            flex: 1
        },
        '& > *':{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }
    },
    itemTotal:{
       display: 'flex',
       paddingTop: theme.spacing.unit*2,
       '& > :first-child':{
           flex: 1
       } 
    }
    
})










class ShippingInfoCard extends React.Component {

    state = {
        showMore: false
    }

    toggleShowMore = () => {
        this.setState(({ showMore }) => ({
            showMore: !showMore
        }))
    }

    render() {
        const { classes, data } = this.props
        const { showMore } = this.state

        return (
            <Paper className={classes.root}>
                <div className={classes.header}>
                    <Typography color="inherit" align="center" component="h6" variant="h6">INFORMACION DEL ENVIO</Typography>
                </div>
                <div className={classes.content}>
                    <div className={classes.mainInfo}>
                        <Typography variant="body1" color="textSecondary" align="center" >Prendas Totales</Typography>
                        <Typography  gutterBottom variant="h5" align="center" >{data.totalProducts}</Typography>
                    </div>
                    <div className={classes.secondaryInfo}>
                        <div>
                            <Typography variant="body1" color="textSecondary" align="center" >Depachado</Typography>
                            <Typography variant="h6" align="center" >{data.shippedProducts}</Typography>
                        </div>
                        <div>
                            <Typography variant="body1" color="textSecondary" align="center" >Pendiente</Typography>
                            <Typography variant="h6" align="center" >{data.totalProducts - data.shippedProducts}</Typography>
                        </div>
                    </div>
                
                    <Collapse in={this.state.showMore}>
                        <Title style={{margin: '16px'}} size="small" align="center" primary="Envios"></Title>

                        <div className={classes.shippingList}>
                        {
                            data.shipments.length ?
                            data.shipments.map(shipping=>(
                                <div key={shipping.id} className={classes.item}>
                                    <div className={classes.main}>
                                        <Typography style={{lineHeight: 1}} variant="subtitle1">{shipping.trackingNumber || 'Pendiente'}</Typography>
                                        <Typography style={{lineHeight: 1.2}} color="textSecondary">{shipping.company}</Typography>
                                        <Typography style={{lineHeight: 1.2}} color="textSecondary">{shipping.totalProducts} prendas</Typography>
                                    </div>
                                    <div className={classes.secondary}>
                                        <MoneyText style={{lineHeight: 1}} align="right" variant="h6">{shipping.price}</MoneyText>
                                        <Typography color="textSecondary" align="right">{shipping.paymentMethod === 'payHere'? 'Cuenta':'Contra Entrega'}</Typography>
                                    </div>
                                </div>
                            ))
                            :
                            <div>
                                <Typography align="center" style={{margin: '24px'}} color="textSecondary" variant="overline" >No hay envios</Typography>
                            </div>
                        }
                        {
                            data.shipments.length &&
                            <Fragment>
                                <Divider/>
                                <div className={classes.itemTotal}>
                                    <Typography variant="h6" color="textSecondary">Total</Typography>
                                    <MoneyText variant="h6" align="right" >{data.shipmentsPrice}</MoneyText>
                                </div>
                            </Fragment>
                        }
                        </div>
                    </Collapse>
                </div>
                <div className={classes.actions}>
                    <Button
                        size="small"
                        onClick={this.toggleShowMore}
                    >
                        {showMore ? 'mostrar menos' : 'mostrar mas'}
                    </Button>
                    <Button
                        disabled={!(data.totalProducts - data.shippedProducts)}
                        color="primary"
                        size="small"
                    >
                        agregar Envio
                    </Button>
                </div>


            </Paper>
        )
    }
}



export default withStyles(styles)(ShippingInfoCard)