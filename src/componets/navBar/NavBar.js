import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem'
import { 
    ArrowBack, 
    Menu as MenuIcon,
    Notifications as NotificacionsIcon
} from '@material-ui/icons'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Grow, Paper, ClickAwayListener, Popper, MenuList, Avatar } from '@material-ui/core';
import Notificacions from './Notifications'

import { getAllNotifications } from '../../actions'

import { setNotificationSeen } from '../../lib/firebaseService'
import {getNameLetters, limitName} from '../../lib/utilities'






const ProfileOptions = ({signOut}) => {
    return (
        <div>
            <MenuList style={{width: 195}}>
                <MenuItem>Perfil</MenuItem>
                <MenuItem onClick={signOut}>Salir</MenuItem>
            </MenuList>
        </div>
    )
}


const styles = theme => ({
    grow: {
        flexGrow: 1
    },
    menuButtom: {
        [theme.breakpoints.up('lg')]: {
            display: 'none'
        }
    },
    notifications:{
        position: 'relative',
        '&:before':{
            content: "''",
            display: 'block',
            width: 0,
            height: 0,
            position: 'absolute',
            borderBottom: `10px solid ${theme.palette.grey[300]}`,
            borderTop: '10px solid transparent',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            top: -20,
            right: 167,
            [theme.breakpoints.down('sm')]:{
                right: 87,
            },
            [theme.breakpoints.down('xs')]:{
                right: 79,
            }
        }
    },
    profile:{
        position: 'relative',
        '&:before':{
            content: "''",
            display: 'block',
            width: 0,
            height: 0,
            position: 'absolute',
            borderBottom: '10px solid #FFF',
            borderTop: '10px solid transparent',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            top: -20,
            right: 88,
            [theme.breakpoints.down('sm')]:{
                right: 36,
            },
            [theme.breakpoints.down('xs')]:{
                right: 28,
            }
        }
    },
    actions:{
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.primary.contrastText
    },
    avatar:{
        width: 30,
        height: 30,
        fontSize: 14,
        background: theme.palette.secondary.dark
    },
    userName:{
        display: 'block',
        [theme.breakpoints.down('sm')]:{
            display: 'none'
        }
    }
    
})


class NavBar extends Component {

    state = {
        anchorEl: null,
        open: false
    }

    anchorEl = {}


    handleMenuClose = (menu) => (event) => {
        if (this.anchorEl[menu].contains(event.target)) {
            return
        }
        this.setState({ open: '' })
    }

    handleOpenProfileMenu = (menu) => () => {
        this.setState(state => {
            if (state.open === menu) {
                return {
                    open: ''
                }
            } else {
                if(menu==='notification'){
                    this.props.getAllNotifications()
                    setTimeout(()=>{
                        setNotificationSeen().then().catch(err=>console.log(err))
                    }, 1000)
                }
                return {
                    open: menu
                }
            }
        })
    }


    signOut = () => {
        firebase.auth().signOut()
    }

    handleBackButtom = () => {
        if (this.props.path) {
            this.props.history.push(this.props.path)
        } else {
            this.props.history.goBack()
        }
    }

    render() {

        const { classes, className, title, showBackButtom, handleToggle, actualUser } = this.props

        return (
            <div className={''} >
                <AppBar className={className} position="fixed">
                    <Toolbar>
                        <IconButton
                            onClick={handleToggle}
                            color="inherit"
                            className={classes.menuButtom}
                        >
                            <MenuIcon />
                        </IconButton>
                        {
                            showBackButtom &&
                            <IconButton
                                color="inherit"
                                onClick={this.handleBackButtom}
                            >
                                <ArrowBack />
                            </IconButton>
                        }

                        <Typography variant="h6" color="inherit" >{title}</Typography>

                        <div className={classes.grow}></div>

                        <div className={classes.actions}>
                            <IconButton
                                color="inherit"
                                buttonRef={node => { this.anchorEl['notification'] = node }}
                                onClick={this.handleOpenProfileMenu('notification')}
                            >
                                <Badge color="secondary" badgeContent={this.props.notificationsCount}>
                                    <NotificacionsIcon />
                                </Badge>
                            </IconButton>
                            <Popper  open={this.state.open === 'notification'} anchorEl={this.anchorEl['notification']} transition disablePortal >
                                {
                                    ({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                            <Paper className={classes.notifications}>
                                                <ClickAwayListener onClickAway={this.handleMenuClose('notification')}>
                                                    <Notificacions uid={this.props.uid} notifications={this.props.notifications}/>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )
                                }
                            </Popper>


                                <IconButton
                                    color="inherit"
                                    onClick={this.handleOpenProfileMenu('profile')}
                                    buttonRef={node => { this.anchorEl['profile'] = node }}
                                >
                                    {/* <AccountCircle /> */}
                                    <Avatar className={classes.avatar}>{getNameLetters(actualUser? actualUser.name: '')}</Avatar>
                                </IconButton>
                                <Typography variant="body2" className={classes.userName} color="inherit">{limitName(actualUser? actualUser.name: '')}</Typography>
                            <Popper open={this.state.open === 'profile'} anchorEl={this.anchorEl['profile']} transition disablePortal >
                                {
                                    ({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                            <Paper className={classes.profile}>
                                                <ClickAwayListener onClickAway={this.handleMenuClose('profile')}>
                                                    <ProfileOptions signOut={this.signOut}/>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )
                                }
                            </Popper>
                        </div>
                    </Toolbar>
                </AppBar>

            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        showBackButtom: state.backButtom.activate,
        path: state.backButtom.path,
        notificationsCount: state.notifications.notSeenCount,
        notifications: state.notifications.all,
        uid: state.user.uid,
        actualUser:  state.sellers[state.user.uid]
    }
}

const mapDispatchToProps = {
    getAllNotifications
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(NavBar)));