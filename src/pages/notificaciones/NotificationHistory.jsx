import React, { useEffect, useMemo } from 'react'
import { Paper, withStyles, Typography, Chip } from '@material-ui/core';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getAllNotifications } from '../../actions'
import { 
    FlightTakeoff,
    Group,
    AttachMoney,
    Widgets
 } from '@material-ui/icons'
import { green, amber} from '@material-ui/core/colors'
import classNames from 'classnames'
import moment from 'moment'



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


const translate = {
    [CLIENTS]: 'Clientes',
    [PAYMENTS]: 'Pagos',
    [ORDERS]: 'Pedidos',
    [SHIPPING]: 'Envios',
    info: 'Información'
}




const NotificationItem = withStyles(theme=>({
    root:{
        maxWidth: 420,
        '&:hover $iconWrapper':{
            transform: 'scale(1.1)'
        }
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
    header:{
        display: 'flex',
        alignItems: 'center'
    },

    date:{
        flex: 1
    },
    iconWrapper:{
        color: '#FFF',
        width: 40,
        height: 40,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: theme.shadows[10],
        marginRight: theme.spacing.unit*3,
        transition: '.2s'
    },
    content:{
        marginLeft: 20,
        paddingLeft: (theme.spacing.unit*3) + 20,
        borderLeft: `dashed 2px ${theme.palette.grey[300]}`    
    },
    title:{
        paddingTop: theme.spacing.unit*2
    },
    message:{
        paddingBottom: theme.spacing.unit*2
    },
    author:{
        paddingBottom: theme.spacing.unit*4,
        color: '#FFF'
    },
    notSeenDot:{
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: theme.palette.primary.light,
        boxShadow: theme.shadows[3]
    }
}))(({classes, notification: data, author})=>{
    const Icon = icons[data.collection]
    return(
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classNames(classes.iconWrapper, classes[data.type])}>
                    <Icon className={classes.icon}/>
                </div>
                <Typography className={classes.date} color="textSecondary">{moment(data.date.seconds*1000).format('DD/MM/YY - hh:mm A')}</Typography>
                {
                    !data.seen &&
                    <div className={classes.notSeenDot}/>
                }
            </div>
            <div className={classes.content}>
                <div className={classes.title}>
                    <Typography variant="h6">{translate[data.collection]}</Typography>
                </div>
                <div className={classes.message}>
                    <Typography color="textSecondary">{data.message}</Typography>
                </div>
                <div className={classNames(classes.author)}>
                    <Chip
                        style={{color: '#FFF'}}
                        className={classes[data.type]} 
                        label={author.name} />
                </div>
            </div>
        </div>
    )
})






const styles = theme =>({
    root:{
        minHeight: 300,
        padding: `${theme.spacing.unit*6}px ${theme.spacing.unit*6}px`,
        [theme.breakpoints.down('xs')]:{
            padding: `${theme.spacing.unit*4}px ${theme.spacing.unit*2}px`,
        } 
    }
})



function NotificationHistory({classes, notifications, notSeenCount, getAllNotifications, uid, sellers}){
 
    useEffect(()=>{
        getAllNotifications()
    },[notSeenCount])

    const list = useMemo(()=>{
        return notifications.map(item=>{
            const seen = item.seen.indexOf(uid) >= 0? false : true
            return{
                ...item,
                seen
            }
        })
    },[notifications])

    return(
        <Paper className={classes.root}>
            {
                list.map(notification=>(
                    <NotificationItem 
                        author={sellers[notification.author]}
                        key={notification.id} 
                        notification={notification}/>
                ))
            }
        </Paper>
    )
}



function mapStateToProps(state, props){
    return{
        notifications: state.notifications.all,
        notSeenCount: state.notifications.notSeenCount,
        uid: state.user.uid,
        sellers: state.sellers
    }
}

const mapDispatchToProps = {
    getAllNotifications
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(NotificationHistory)


