import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { Paper, Grid } from '@material-ui/core';
import { yellow, teal, blue } from '@material-ui/core/colors'




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
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'center',
        padding: ` 0 ${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
    },
    statItem:{
        marginBottom: `${theme.spacing.unit * 2}px`,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'center'
    },
    cardHeader:{
        color: '#FFF',
        marginBottom: `${theme.spacing.unit}px`,
        padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px`
    },
    paper:{
        marginTop:`${theme.spacing.unit * 4}px`,
        overflow: 'hidden'
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
    const { classes } = props
    return(
        <Grid container spacing={16}>

            <Grid item sm={4} >
                <Paper className={classes.paper} >
                    <div className={classNames(classes.cardHeader, classes.orange) }>
                        <Typography align="center" color="inherit" component="span" variant="h5" >Ubicación</Typography>
                    </div>
                    <div className={classes.stats}>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle1" color="textSecondary">Pais:</Typography>
                            <Typography align="left" component="span" variant="h6" color="textPrimary">Mexico</Typography>
                        </div>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle1" color="textSecondary">Ciudad:</Typography>
                            <Typography align="left" component="span" variant="h6" color="textPrimary">Mexico DF</Typography>
                        </div>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle1" color="textSecondary">Direccion:</Typography>
                            <Typography align="left" component="span" variant="h6" color="textPrimary">Crr 23B # 4 - 09</Typography>
                        </div>
                    </div>
                </Paper>
            </Grid>


            <Grid item sm={4} >
                <Paper className={classes.paper} >
                    <div className={classNames(classes.cardHeader, classes.green) }>
                        <Typography align="center" color="inherit" component="span" variant="h5" >Contacto</Typography>
                    </div>
                    <div className={classes.stats}>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle1" color="textSecondary">Telefono:</Typography>
                            <Typography align="left" component="span" variant="h6" color="textPrimary">3217378301</Typography>
                        </div>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle1" color="textSecondary">correo:</Typography>
                            <Typography align="left" component="span" variant="h6" color="textPrimary">Fabian0896@outlook.com</Typography>
                        </div>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle1" color="textSecondary">vendedor encargado:</Typography>
                            <Typography align="left" component="span" variant="h6" color="textPrimary">Maria Lili</Typography>
                        </div>
                    </div>
                </Paper>
            </Grid>


            <Grid item sm={4} >
                <Paper className={classes.paper} >
                    <div className={classNames(classes.cardHeader, classes.blue) }>
                        <Typography align="center" color="inherit" component="span" variant="h5" >Resumen</Typography>
                    </div>
                    <div className={classes.stats}>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle1" color="textSecondary">Saldo Pendiente:</Typography>
                            <Typography align="left" component="span" variant="h6" color="textPrimary">$1.000.000</Typography>
                        </div>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle1" color="textSecondary">Ultimo pedido:</Typography>
                            <Typography align="left" component="span" variant="h6" color="textPrimary">20/04/18</Typography>
                        </div>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle1" color="textSecondary">Ultimo Pago:</Typography>
                            <Typography align="left" component="span" variant="h6" color="textPrimary">25/04/18</Typography>
                        </div>
                    </div>
                </Paper>
            </Grid>



        </Grid>
    )
}

export default  withStyles(styles)(ClientDetailInfo);