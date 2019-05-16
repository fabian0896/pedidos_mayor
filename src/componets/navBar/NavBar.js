import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MenuItem from '@material-ui/core/MenuItem'
import { ArrowBack, Menu as MenuIcon } from '@material-ui/icons'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Grow, Paper, ClickAwayListener, Popper, MenuList } from '@material-ui/core';


const ProfileOptions = ({signOut}) => {
    return (
        <div>
            <MenuList>
                <MenuItem>Perfil</MenuItem>
                <MenuItem>My Acount alsjdl aslkjd</MenuItem>
                <MenuItem onClick={signOut}>Salir</MenuItem>
            </MenuList>
        </div>
    )
}


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
    }
}))(({classes}) => {
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography variant="subtitle1" >Notificaciones</Typography>
            </div>
            <MenuList>
                <MenuItem>Notificacion 1</MenuItem>
                <MenuItem>notificacion 2</MenuItem>
                <MenuItem>Notificacion 3</MenuItem>
            </MenuList>
        </div>
    )
})








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
            right: 82
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
            right: 33
        }
    },
    
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

        const { classes, className, title, showBackButtom, handleToggle } = this.props


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

                        <div className="">
                            <IconButton
                                color="inherit"
                                buttonRef={node => { this.anchorEl['notification'] = node }}
                                onClick={this.handleOpenProfileMenu('notification')}
                            >
                                <Badge color="secondary" badgeContent={3}>
                                    <MailIcon />
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
                                                    <Notificacions/>
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
                                <AccountCircle />
                            </IconButton>
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
        path: state.backButtom.path
    }
}

export default connect(mapStateToProps)(withRouter(withStyles(styles)(NavBar)));