import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { Paper, Grid } from '@material-ui/core';
import { yellow, teal, blue } from '@material-ui/core/colors'
import {
    Place,
    Phone,
    AttachMoney as Money
 } from '@material-ui/icons'




const styles = theme => ({
    title: {
        marginBottom: '15px'
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    stats: {
        minHeight: '250px',
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'center',
        padding: `${theme.spacing.unit }px ${theme.spacing.unit * 2}px`,
    },
    statItem:{
        //marginBottom: `${theme.spacing.unit * 2}px`,
        width: '100%',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'center'
    },
    cardHeader:{
        color: '#FFF',
        //marginBottom: `${theme.spacing.unit}px`,
        display: 'flex',
        flexDirection: 'column',
        //justifyContent: 'center',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
    },
    paper:{
        overflow: 'hidden',
        display: 'flex',
        height: '100%',
        //flexDirection: 'column',
    },
    orange:{
        background: yellow[800],
    },
    green:{
        background: teal[800],
    },
    blue:{
        background: blue[800],
    }
})

function ClientDetailInfo(props){
    const { classes, client } = props
    return(
        <Grid container spacing={24}>

            <Grid item sm={4} >
                <Paper className={classes.paper} >
                    <div className={classNames(classes.cardHeader, classes.orange) }>
                        <Place fontSize="large" />
                        <Typography align="center" color="inherit" component="span" variant="h6" >Ubicación</Typography>
                    </div>
                    <div className={classes.stats}>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle2" color="textSecondary">Pais:</Typography>
                            <Typography align="left" component="span" variant="subtitle1" color="textPrimary">{client.country.translations.es}</Typography>
                        </div>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle2" color="textSecondary">Ciudad:</Typography>
                            <Typography align="left" component="span" variant="subtitle1" color="textPrimary">{client.city}</Typography>
                        </div>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle2" color="textSecondary">Direccion:</Typography>
                            <Typography align="left" component="span" variant="subtitle1" color="textPrimary">{client.address}</Typography>
                        </div>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle2" color="textSecondary">Codigo Postal:</Typography>
                            <Typography align="left" component="span" variant="subtitle1" color="textPrimary">{client.zipCode}</Typography>
                        </div>
                    </div>
                </Paper>
            </Grid>


            <Grid item sm={4} >
                <Paper className={classes.paper} >
                    <div className={classNames(classes.cardHeader, classes.green) }>
                        <Phone fontSize="large" />
                        <Typography align="center" color="inherit" component="span" variant="h6" >Contacto</Typography>
                    </div>
                    <div className={classes.stats}>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle2" color="textSecondary">Telefono:</Typography>
                            <Typography align="left" component="span" variant="subtitle1" color="textPrimary">{client.phone}</Typography>
                        </div>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle2" color="textSecondary">correo:</Typography>
                            <Typography align="left" component="span" variant="subtitle1" color="textPrimary">{client.email}</Typography>
                        </div>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle2" color="textSecondary">vendedor encargado:</Typography>
                            <Typography align="left" component="span" variant="subtitle1" color="textPrimary">{client.seller.name}</Typography>
                        </div>
                    </div>
                </Paper>
            </Grid>


            <Grid item sm={4} >
                <Paper className={classes.paper} >
                    <div className={classNames(classes.cardHeader, classes.blue) }>
                        <Money fontSize="large" />
                        <Typography align="center" color="inherit" component="span" variant="h6" >Resumen</Typography>
                    </div>
                    <div className={classes.stats}>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle2" color="textSecondary">Saldo Pendiente:</Typography>
                            <Typography align="left" component="span" variant="subtitle1" color="textPrimary">$1.000.000</Typography>
                        </div>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle2" color="textSecondary">Ultimo pedido:</Typography>
                            <Typography align="left" component="span" variant="subtitle1" color="textPrimary">20/04/18</Typography>
                        </div>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle2" color="textSecondary">Ultimo Pago:</Typography>
                            <Typography align="left" component="span" variant="subtitle1" color="textPrimary">25/04/18</Typography>
                        </div>
                    </div>
                </Paper>
            </Grid>



        </Grid>
    )
}

export default  withStyles(styles)(ClientDetailInfo);