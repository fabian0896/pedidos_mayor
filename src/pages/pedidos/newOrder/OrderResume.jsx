import React from 'react'
import { withStyles, Typography, Divider } from '@material-ui/core'
import OrderProductTable from '../orderDetails/OrderProductTable'
import NumberFormat from 'react-number-format';
import { convertCurrency } from '../../../lib/currencyService'

const styles = theme =>({
    root:{
        marginTop: theme.spacing.unit*2
    },
    divider:{
        marginTop: theme.spacing.unit*2,
        marginBottom: theme.spacing.unit*2
    },
    shippingInfo:{
        display: 'flex',
        flexDirection: 'row',
        maxWidth: 450,
        marginBottom: theme.spacing.unit*3,
        '& div':{
            flex: 1,
            paddingRight: theme.spacing.unit*2
        }   
    },
    product:{
        marginBottom: theme.spacing.unit*3,
    },
    moneyInfo:{
        display: 'flex',
        flexDirection: 'column',
        width: 400,
        marginBottom: theme.spacing.unit*2,
        '& div':{
            display: 'flex',
            alignItems: 'center',
            paddingRight: theme.spacing.unit*2,
            marginBottom: theme.spacing.unit*2
        },
        '& div *':{
            flex: 1
        }   
    },
    title:{
        fontWeight: 600,
        marginRight: theme.spacing.unit*2
    }
})

class OrderResume extends React.Component{
    state={
        currency: 0,
        clientCurrency: '',
        currencyName: ''
    }

    async componentDidMount(){
        const { data, currency: orderCurrency } = this.props
        const clientCurrency = data.clientInfo.country.currencies[0].code
        if(clientCurrency !== 'COP'){
            const currency = await convertCurrency(orderCurrency, clientCurrency, data.total)
            const currencyName = data.clientInfo.country.currencies[0].name
            this.setState({currency,clientCurrency, currencyName})
        }
        return
    }

    render(){
        const { classes, data, currency: orderCurrency } = this.props
        const shipping = data.shipping
        const client = data.clientInfo
        const clientCountry = client.country.translations.es || client.country.name
        return(
            <div className={classes.root}>
                <Typography variant="h4">{client.name}</Typography>
                <Typography color="textSecondary" variant="body1">{`${client.city}, ${clientCountry}`}</Typography>
                <Divider className={classes.divider}/>
                <Typography gutterBottom variant="h6">Envio</Typography>
                <div className={classes.shippingInfo}>
                    <div>
                        <Typography color="textSecondary" variant="body2">Nombre</Typography>
                        <Typography gutterBottom variant="body1">{shipping.name}</Typography>
                        
                        <Typography color="textSecondary" variant="body2">Pais</Typography>
                        <Typography gutterBottom variant="body1">{shipping.country}</Typography>
                        
                        <Typography color="textSecondary" variant="body2">Ciudad</Typography>
                        <Typography gutterBottom variant="body1">{shipping.city}</Typography>
                        
                        <Typography color="textSecondary" variant="body2">Direccion</Typography>
                        <Typography gutterBottom variant="body1">{shipping.address}</Typography>
                    </div>
                    <div>
                        <Typography color="textSecondary" variant="body2">Codigo Postal</Typography>
                        <Typography gutterBottom variant="body1">{shipping.zipCode}</Typography>
                        
                        <Typography color="textSecondary" variant="body2">Telefono</Typography>
                        <Typography gutterBottom variant="body1">{shipping.phone}</Typography>
                        
                        <Typography color="textSecondary" variant="body2">Corre Electronico</Typography>
                        <Typography gutterBottom variant="body1">{shipping.email}</Typography>
                    </div>
                </div>
                <div className={classes.product}>
                    <OrderProductTable currency={orderCurrency} data={data.products} />
                </div>
                <Typography gutterBottom variant="h6">Valor</Typography>
                <div className={classes.moneyInfo}>
                    <div>
                        <Typography align="right" className={classes.title} color="primary" variant="subtitle1">Sub Total</Typography>
                        <NumberFormat 
                            value={data.subTotal} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'} 
                            renderText={value => <Typography  variant="subtitle1">{value}</Typography>} />
                    </div>
                    <div>
                        <Typography align="right" className={classes.title} color="primary" variant="subtitle1">Descuento</Typography>
                        <Typography  variant="subtitle1">{`${data.descount}%`}</Typography>
                    </div>
                    <div>
                        <Typography align="right" className={classes.title} color="primary" variant="subtitle1">Total</Typography>
                        <NumberFormat 
                            value={data.total} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'} 
                            renderText={value => <Typography  variant="h6">{value}</Typography>} />
                    </div>
                    {
                        orderCurrency !== 'COP' &&
                        <div>
                            <Typography align="right" className={classes.title} color="primary" variant="subtitle1">Moneda Local</Typography>
                            <NumberFormat 
                                value={this.state.currency.toFixed(1) || '---'} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                prefix={`${this.state.clientCurrency} `} 
                                renderText={value => <Typography  variant="h6">{value}</Typography>} />
                        </div>
                    }
                    {
                        orderCurrency !== 'COP' &&
                        <Typography variant="overline" color="textSecondary" >{ '*' + this.state.currencyName}</Typography>
                    }
                </div>
            </div>
        )
    }
}


export default withStyles(styles)(OrderResume)