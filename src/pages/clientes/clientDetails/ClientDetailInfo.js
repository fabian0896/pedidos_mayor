import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { Paper, Grid, Divider, Button } from '@material-ui/core';
import { yellow, teal, blue, green, red, cyan } from '@material-ui/core/colors'
import {
    Place,
    Phone,
    AttachMoney as Money
 } from '@material-ui/icons'
import moment from 'moment'
import MoneyValue from '../../../componets/moneyText/MoneyText'


const UnPayItems = withStyles(theme=>({
    root:{
        padding: theme.spacing.unit*1,
        display: 'flex',
        alignItems: 'center',
        '& > :first-child':{
            flex: 1,
        }
    }
}))(({classes, order})=>{
    return(
        <div className={classes.root}>
            <div>
                <Typography variant="h6">{order.serialCode}</Typography>
                <Typography style={{lineHeight: 1}} color="textSecondary">{moment(order.createdAt.seconds*1000).format('DD/MMM/YYYY')}</Typography>
            </div>
            <MoneyValue variant="body2" color="textSecondary">{order.balance}</MoneyValue>
        </div>
    )
})



const BalanceItem = withStyles(theme=>({
    root:{
        padding: theme.spacing.unit*1,
        display: 'flex',
        alignItems: 'center',
        '& > :first-child':{
            flex: 1,
        }
    }
}))(({classes, item})=>{
    return(
        <div className={classes.root}>
            <div>
                <Typography variant="subtitle1" >{item.sourceName}</Typography>
                <Typography variant="subtitle2" style={{lineHeight: 1}} color="textSecondary">{moment(item.date.seconds*1000).format('DD/MMM/YYYY')}</Typography>
            </div>
            <MoneyValue style={{color: item.value < 0? red['500']:green['A700']}} variant="body2" color="textSecondary">{item.value}</MoneyValue>
        </div>
    )
})




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
    },
    cyan:{
        background: cyan[800]
    },
    unPayItems:{
        flex: 1,
        overflow: 'auto',
        maxHeight: 175
    },
    noUnpayItems:{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    balanceItem:{
        marginBottom: theme.spacing.unit,
        marginTop: theme.spacing.unit
    }
})

function ClientDetailInfo(props){
    const { classes, client, unPayOrders } = props

    
    const getTotalUnPayOrders = (orders)=>{
            return orders.reduce((prev, curr)=>{
                return prev +  curr.balance
            }, 0)
    }


    const totalValueUnPayOrders = getTotalUnPayOrders(unPayOrders)

    return(
        <Grid container spacing={24}>

            <Grid item xs={12} sm={6} md={6} >
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


            <Grid item xs={12} sm={6} md={6}>
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
                            <Typography align="left" component="span" variant="subtitle1" color="textPrimary">{client.email || 'No tiene'}</Typography>
                        </div>
                        <div className={classes.statItem}>
                            <Typography component="span" variant="subtitle2" color="textSecondary">vendedor encargado:</Typography>
                            <Typography align="left" component="span" variant="subtitle1" color="textPrimary">{client.seller.name}</Typography>
                        </div>
                    </div>
                </Paper>
            </Grid>


            <Grid item xs={12} sm={6} md={6}>
                <Paper className={classes.paper} >
                    <div className={classNames(classes.cardHeader, classes.blue) }>
                        <Money fontSize="large" />
                        <Typography align="center" color="inherit" component="span" variant="h6" >Resumen</Typography>
                    </div>
                    <div className={classes.stats}>
                        <div className={classes.balanceItem}>
                            <MoneyValue style={{color: (client.balance || 0) > 0 ? red['500'] : 'black'}} align="center" component="span" variant="h5" color="inherit">{(totalValueUnPayOrders || 0) < 0 ? 0 : (totalValueUnPayOrders || 0)}</MoneyValue>
                            <Typography component="span" align="center" variant="subtitle2" color="textSecondary">Saldo Pendiente:</Typography>
                        </div>
                        <Divider/>
                        {
                            !!unPayOrders.length?
                            <div className={classes.unPayItems}>
                                {
                                    unPayOrders.map(order=>(
                                        <UnPayItems key={order.id} order={order}/>
                                    ))
                                }
                            </div>
                            :
                            <div className={classes.noUnpayItems}>
                                <Typography align="center" variant="overline">No hay pedidos sin pagar :)</Typography>
                            </div>
                        }
                    </div>
                </Paper>
            </Grid>


            <Grid item xs={12} sm={6} md={6}>
                <Paper className={classes.paper} >
                    <div className={classNames(classes.cardHeader, classes.cyan) }>
                        <Money fontSize="large" />
                        <Typography align="center" color="inherit" component="span" variant="h6" >Saldo positivo</Typography>
                    </div>
                    <div className={classes.stats}>
                        <div className={classes.balanceItem}>
                            <MoneyValue style={{color: (client.positiveBalance || 0) >= 0 ? green['A700'] : red['500']}} align="center" component="span" variant="h5" color="inherit" >{client.positiveBalance || 0}</MoneyValue>
                            <Typography component="span" align="center" variant="subtitle2" color="textSecondary">Saldo a favor:</Typography>
                        </div>
                        <Divider/>
                        {
                             !!client.positiveBalanceHistory?
                            <div className={classes.unPayItems}>
                                {
                                    client.positiveBalanceHistory.map((item, index)=>(
                                        <BalanceItem key={index} item={item}/>
                                    ))
                                }
                            </div>
                            :
                            <div className={classes.noUnpayItems}>
                                <Typography align="center" variant="overline">No hay registros</Typography>
                            </div>
                        }
                        <div>
                            <Button 
                                fullWidth
                                color="primary"
                            >
                                Agregar Saldo
                            </Button>
                        </div>
                    </div>
                </Paper>
            </Grid>



        </Grid>
    )
}

export default  withStyles(styles)(ClientDetailInfo);