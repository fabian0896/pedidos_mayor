import React, { useMemo, useCallback } from 'react'
import { Typography, withStyles } from '@material-ui/core'
import { 
    FlightTakeoff,
    Group,
    AttachMoney,
    Widgets
 } from '@material-ui/icons'
import { green, amber} from '@material-ui/core/colors'
import classNames from 'classnames'
import moment from 'moment'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

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
        cursor: 'pointer',
        '&:first-child':{
            padding: `${theme.spacing.unit*2}px ${theme.spacing.unit*2}px ${theme.spacing.unit}px`,
        },
        '&:hover $iconWrapper':{
            transform: 'scale(1.1)'
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
        marginRight: theme.spacing.unit*2,
        transition: '.2s',
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
}))(({classes, notification: data, author, handleClick})=>{
    const Icon = icons[data.collection]

    return(
        <div onClick={handleClick(data.link)} className={classNames(classes.root,{[classes.notSeen]: !data.seen})}>
           <div className={classNames(classes.iconWrapper, classes[data.type])}>
                <Icon className={classes.icon}/>
           </div>
           <div className={classes.content}>
                <div className={classes.date}>
                    <Typography color="textSecondary">{moment(data.date.seconds*1000).format('DD/MM/YY - hh:mm A')}</Typography>
                    {
                        !data.seen &&
                        <div className={classes.notSeenDot}></div>
                    }
                </div>
                <div className={classes.message}>
                    <Typography variant="body1">{data.message}</Typography>
                </div>
                <div className={classes.author}>
                    <Typography variant="overline" color="textSecondary">{author.name}</Typography>
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
    scroller:{
        maxHeight: 400,
        overflow: 'auto'
    },
    header:{
        height: theme.spacing.unit*6,
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing.unit*2,
        background: theme.palette.grey[300],
        boxShadow: theme.shadows[1]
    },
    content:{
        
    }
}))(({classes, notifications, uid, sellers, history}) => {

    const handleClick = useCallback((link)=>()=>{
        console.log(link)
        history.push({pathname: link})
    }, [history])

    const notificationList = useMemo(()=>{
        return  notifications.slice(0,10).map(noti =>{
            //si mi uid esta en el arreglo significa que no he visto la notificacon
            const seen =  noti.seen.indexOf(uid) >= 0 ? false : true
            return {
                ...noti,
                seen 
            }
        })
    }, [notifications]) 

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography variant="subtitle1" >Notificaciones</Typography>
            </div>
            <div className={classes.scroller}>
                <div className={classes.content}>
                    {
                        notificationList.map(notification =>(
                            <Item
                                handleClick={handleClick} 
                                author={sellers[notification.author]} 
                                key={notification.id} 
                                notification={notification}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
})


function mapStateToProps(state){
    return{
        sellers: state.sellers
    }
}




export default compose(
    withRouter,
    connect(mapStateToProps)
)(Notificacions)