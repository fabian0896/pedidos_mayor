import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton  from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { ArrowBack, Menu as MenuIcon } from '@material-ui/icons'


import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'


const styles = theme => ({
    grow:{
        flexGrow: 1
    },
    menuButtom:{
        [theme.breakpoints.up('md')]: {
           display: 'none'
        }
    }
})


class NavBar extends Component{
    
    state ={
        anchorEl: null
    }
    
    handleMenuClose = (event) =>{
        this.setState({anchorEl: null});
    }

    handleOpenProfileMenu = event => {
        this.setState({ anchorEl: event.currentTarget })
    }
    

    signOut = () => {
        firebase.auth().signOut()
    }

    handleBackButtom = ()=>{
        if(this.props.path){
            this.props.history.push(this.props.path)
        }else{
            this.props.history.goBack()
        }
    }

    render(){

        const { classes, className, title, showBackButtom, handleToggle } = this.props
        const { anchorEl } = this.state

        const menuOpen = Boolean(anchorEl)

        const profileMenu =(
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top' ,horizontal: 'center'}}
                transformOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={menuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem>Perfil</MenuItem>
                <MenuItem>My Acount alsjdl aslkjd</MenuItem>
                <MenuItem onClick={ this.signOut }>Salir</MenuItem>
            </Menu>
        )


        return(
            <div className={ '' } >
                <AppBar className={ className } position="fixed">
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
                                <ArrowBack/>
                            </IconButton>
                        }

                        <Typography variant="h6" color="inherit" >{ title }</Typography>

                        <div className={ classes.grow }></div>

                        <div className="">
                            <IconButton
                                color="inherit"
                            >
                                <Badge color="secondary" badgeContent={3}>
                                    <MailIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton
                                color="inherit"
                                onClick={this.handleOpenProfileMenu}
                                aria-owns={ menuOpen? 'material-appbar' : undefined }
                                aria-haspopup="true"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>

                    </Toolbar>
                </AppBar>
                {profileMenu}
            </div>
        )
    }
}

function mapStateToProps(state, props){
    return{
        showBackButtom: state.backButtom.activate,
        path: state.backButtom.path
    }
}

export default connect(mapStateToProps)(withRouter(withStyles(styles)(NavBar)));