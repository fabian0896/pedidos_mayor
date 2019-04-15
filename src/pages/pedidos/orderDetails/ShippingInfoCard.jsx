import React from 'react'
import {
    withStyles,
    Paper,
    Typography,
    Divider,
    IconButton
} from '@material-ui/core';
import { FileCopy as FileCopyIcon } from '@material-ui/icons'




const stylesShippingData = theme =>({
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing.unit,
        '& :nth-child(1)': {
            flex: 1
        }
    },
    icon: {
        fontSize: '18px'
    }
})


let ShippingData = ({classes, title, value }) => (
    <div className={classes.infoItem}>
        <div>
            <Typography color="textSecondary" variant="body2">{title}</Typography>
            <Typography variant="body1">{value}</Typography>
        </div>
        <IconButton >
            <FileCopyIcon className={classes.icon} fontSize="inherit" />
        </IconButton>
    </div>
)

ShippingData = withStyles(stylesShippingData)(ShippingData)







const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    },
    divider: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    }
})












function ShippingInfoCard(props) {
    const { classes } = props
    return (
        <Paper className={classes.root}>
            <Typography component="h6" variant="h6">INFORMACION DEL ENVIO</Typography>
            <Divider className={classes.divider} />
            
            <ShippingData 
                title="nombre" 
                value="Fabian David Dueñas"/>
            <ShippingData 
                title="correo" 
                value="fabian0896@outlook.com"/>
            <ShippingData 
                title="telefono" 
                value="+(57) 321 7378301"/>
            <ShippingData 
                title="Pais" 
                value="Colombia"/>
            <ShippingData 
                title="Ciudad" 
                value="Cali"/>
            <ShippingData 
                title="Dirección" 
                value="Crr 23B # 4 - 09 Barrio Miraflores Piso 2"/>
            <ShippingData 
                title="Codigo Postal" 
                value="76001"/>
            
            <div>
                <Typography align="center">F456774E3</Typography>
                <Typography align="center">Fedex</Typography>
            </div>
            

        </Paper>
    )
}


export default withStyles(styles)(ShippingInfoCard)