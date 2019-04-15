import React from 'react'
import { withStyles, Paper, Typography, Divider } from '@material-ui/core';

const styles = theme =>({
    root:{
        padding: theme.spacing.unit*2
    },
    divider:{
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    }
})

function ShippingInfoCard(props){
    const { classes } = props
    return(
        <Paper className={classes.root}>
            <Typography component="h6" variant="h6">Información del Envio</Typography>
            <Divider className={classes.divider}/>
        </Paper>
    )
}


export default withStyles(styles)(ShippingInfoCard)