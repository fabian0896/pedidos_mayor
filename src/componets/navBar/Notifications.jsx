import React from 'react'
import { Typography, withStyles, Divider } from '@material-ui/core'
import { 
    FlightTakeoff,
    Group,
    AttachMoney,
    Widgets
 } from '@material-ui/icons'
import { green, amber} from '@material-ui/core/colors'
import classNames from 'classnames'

const CLIENTS = 'clients'
const ORDERS = 'orders'
const PAYMENTS = 'payments'
const SHIPPING = 'shipping'


const icons = {
    [CLIENTS]: Group,
    [PAYMENTS]: AttachMoney,
    [ORDERS]: Widgets,
    [SHIPPING]: FlightTakeoff
}

const Item = withStyles(theme=>({
    root:{
        padding: `${theme.spacing.unit}px ${theme.spacing.unit*2}px`,
        display: 'flex',
        '&:first-child':{
            padding: `${theme.spacing.unit*2}px ${theme.spacing.unit*2}px ${theme.spacing.unit}px`,
        }
    },
    iconWrapper:{
        width: 40,
        height: 40,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: theme.shadows[3],
        marginRight: theme.spacing.unit*2
    },
    icon:{

    },
    CREATED: {
        backgroundColor: green[600],
    },
    DELETED: {
        backgroundColor: theme.palette.error.dark,
    },
    UPDATED: {
        backgroundColor: amber[700]
    },
    INFO:{
        backgroundColor: theme.palette.primary.dark,
    },
    content:{
        flex: 1
    },
    date:{
        display: 'flex',
        //alignItems: 'center',
        '& > :first-child':{
            flex: 1
        }
    },
    notSeenDot:{
        height: 6,
        width: 6,
        borderRadius: '50%',
        background: theme.palette.primary.light,
        boxShadow: theme.shadows[3],
    },
    message:{

    },
    author:{

    },
    notSeen:{
        background: theme.palette.grey[100]
    }
}))(({classes})=>{
    const Icon = icons['shipping']
    return(
        <div className={classNames(classes.root,{[classes.notSeen]: false})}>
           <div className={classNames(classes.iconWrapper, classes['UPDATED'])}>
                <Icon className={classes.icon}/>
           </div>
           <div className={classes.content}>
                <div className={classes.date}>
                    <Typography color="textSecondary">10/12/2019</Typography>
                    <div className={classes.notSeenDot}></div>
                </div>
                <div className={classes.message}>
                    <Typography variant="body1">Se agrego envio a el pedido A036 a nombre de Fabian David Dueñas Garcia. (10) prendas despachadas</Typography>
                </div>
                <div className={classes.author}>
                    <Typography variant="overline" color="textSecondary">Fabian David Dueñas</Typography>
                </div>
           </div>
        </div>
    )
})









const Notificacions = withStyles(theme=>({
    root:{
        width: 360,
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden'
    },
    header:{
        height: theme.spacing.unit*6,
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing.unit*2,
        background: theme.palette.grey[300]
    },
    content:{
        
    }
}))(({classes}) => {
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography variant="subtitle1" >Notificaciones</Typography>
            </div>
            <div className={classes.content}>
                <Item/>
                <Item/>
                <Item/>
            </div>
        </div>
    )
})


export default Notificacions