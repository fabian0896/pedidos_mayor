import React from  'react'
import { Typography, withStyles } from '@material-ui/core';
import Title from '../../../componets/title/Title';
import ListShippingUnits from './ListShippingUnits';




const styles = theme =>({
    root:{
        width: 450
    },
    shippingInfo:{
        marginTop: theme.spacing.unit*3,
        marginBottom: theme.spacing.unit*3,
        display: 'flex',
        '& > *':{
            flex: 1,
            paddingRight: theme.spacing.unit*2
        },
    },
    extraInfo:{
        marginTop: theme.spacing.unit*3,
    },
    infoData:{
        display: 'flex',
        '& > *':{
            flex: 1,
            minHeight: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            borderRight: `1px solid ${theme.palette.grey[300]}`,
        },
        '& > :last-child':{
            borderRight: 'none'
        }
    },
    trackNumber:{
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        minHeight: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
})


function ShippingResume(props){
    const {shipping: data, classes} = props
    return(
        <div className={classes.root}>
            <Title
                align="center" 
                primary={`Pedido ${data.order.label}`}
                secondary={data.order.secondary}
                size="small"/>
            
            <div className={classes.shippingInfo}>
                <div>
                    <Typography variant="body2">{data.shipping.name}</Typography>
                    <Typography gutterBottom color="textSecondary">Nombre</Typography>
                    
                    <Typography variant="body2">{data.shipping.country}</Typography>
                    <Typography gutterBottom color="textSecondary">Pais</Typography>
                    
                    <Typography variant="body2">{data.shipping.city}</Typography>
                    <Typography gutterBottom color="textSecondary">Ciudad</Typography>
                    
                    <Typography variant="body2">{data.shipping.address}</Typography>
                    <Typography gutterBottom color="textSecondary">Direccion</Typography>
                </div>
                <div>
                    <Typography variant="body2">{data.shipping.phone}</Typography>
                    <Typography gutterBottom color="textSecondary">Telefono</Typography>
                    
                    <Typography variant="body2">{data.shipping.email}</Typography>
                    <Typography gutterBottom color="textSecondary">Correo</Typography>
                    
                    <Typography variant="body2">{data.shipping.zipCode}</Typography>
                    <Typography gutterBottom color="textSecondary">Codigo Postal</Typography>
                </div>
            </div>

            <Title
                align="left" 
                primary="Empaques"
                secondary="paquetes del envio"
                size="small"/>
            <ListShippingUnits
                value={data.shippingUnits}
                pendingProducts={data.order.pendingProducts} />
            
            <Title
                style={{marginTop: 24}}
                align="right" 
                primary="Datos"
                secondary="Datos del envio"
                size="small"/>
            <div className={classes.extraInfo}>
                <div className={classes.infoData}>
                    <div>
                        <Typography color="inherit" align="center" variant="h6">{data.price}</Typography>
                        <Typography align="center" color="inherit">valor</Typography>
                    </div>
                    <div>
                        <Typography color="inherit" align="center" variant="h6">{data.company}</Typography>
                        <Typography align="center" color="inherit">Empresa</Typography>
                    </div>
                </div>
                <div className={classes.trackNumber}>
                    <Typography color="inherit" align="center" variant="h6">{data.trackingNumber || 'Pendiente'}</Typography>
                    <Typography align="center" color="inherit">Guia</Typography>
                </div>
            </div>
        </div>

        
    )
}




export default withStyles(styles)(ShippingResume)