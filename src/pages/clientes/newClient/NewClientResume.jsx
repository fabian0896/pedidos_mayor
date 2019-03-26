import React from 'react'
import {
    Typography,
    Grid
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'


const styles = theme =>({
    root:{
        margin: `${theme.spacing.unit * 3}px 0`
    },
    info:{
        marginBottom: `${theme.spacing.unit * 2}px`
    },
    flag:{
        height: '30px',
        marginLeft: '20px',
        borderRadius: '5px',
        boxShadow: theme.shadows[1]
    },
    header:{
        display: 'flex',
        alignItems: 'center'
    }
})



function NewClientResume(props){
    
    const {
        name,
        phone,
        email,
        address,
        country,
        city,
        zipCode,
        classes
    } = props
    const flag = country.flag
    const countryName = country.translations.es || country.name
    const callingCode = country.callingCodes[0]
    return(
        <div className={ classes.root }>
            <div className={ classes.header }>
                <Typography component="h3" variant="h4" >{name}</Typography>
                {
                    flag &&
                    <img className={ classes.flag } src={flag} alt={countryName}/>
                }
            </div>
            <Grid container spacing={24} className={classes.root}>
                <Grid item md={4}>
                    <div className={classes.info}>
                        <Typography component="span" variant="subtitle2" color="textSecondary">Telefono:</Typography>
                        <Typography component="span" variant="subtitle1" color="textPrimary">+({callingCode}) {phone}</Typography>
                    </div>
                    <div className={classes.info}>
                        <Typography component="span" variant="subtitle2" color="textSecondary">Correo electronico:</Typography>
                        <Typography component="span" variant="subtitle1" color="textPrimary">{email}</Typography>
                    </div>
                    <div className={classes.info}>
                        <Typography component="span" variant="subtitle2" color="textSecondary">Codigo Postal:</Typography>
                        <Typography component="span" variant="subtitle1" color="textPrimary">{zipCode}</Typography>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div className={classes.info}>
                        <Typography component="span" variant="subtitle2" color="textSecondary">Pais:</Typography>
                        <Typography component="span" variant="subtitle1" color="textPrimary">{countryName}</Typography>
                    </div>
                    <div className={classes.info}>
                        <Typography component="span" variant="subtitle2" color="textSecondary">Ciudad:</Typography>
                        <Typography component="span" variant="subtitle1" color="textPrimary">{city}</Typography>
                    </div>
                    <div className={classes.info}>
                        <Typography component="span" variant="subtitle2" color="textSecondary">Dirección:</Typography>
                        <Typography component="span" variant="subtitle1" color="textPrimary">{address}</Typography>
                    </div>
                </Grid>
            </Grid>
            
        </div>
    )
}



export default withStyles(styles)(NewClientResume);