import React, { Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemIText from '@material-ui/core/ListItemText'
import logo from '../../assets/fajas-logo.png'
import { NavLink } from 'react-router-dom'
import Hidden from '@material-ui/core/Hidden';




class SideNavBar extends React.Component {
    render() {

        const { classes, links, open, handleToggle, ...rest } = this.props
        const drawer = (
            <Fragment>
                <div className={classes.logoContainer}>
                    <img className={classes.logo} src={logo} alt="fajas internacionales" />
                </div>
                <List>
                    {
                        links.map(({ text, route, Icon }) => {
                            return (
                                <NavLink
                                    to={route}
                                    key={text}
                                    style={{ textDecoration: 'none' }}
                                    activeClassName={classes.slectedRoute}
                                    onClick={handleToggle}
                                >
                                    <ListItem className={classes.selected} button>
                                        <ListItemIcon  ><Icon  /></ListItemIcon>
                                        <ListItemIText
                                            primary={text} />
                                    </ListItem>
                                </NavLink>
                            )
                        })
                    }
                </List>
            </Fragment>
        )

        return (
            <Fragment>
                <Hidden mdDown implementation="js">
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        anchor="left"
                        {...rest}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden lgUp implementation="js">
                    <Drawer
                        open={open}
                        onClose={handleToggle}
                        className={classes.drawer}
                        variant="temporary"
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        anchor="left"
                        {...rest}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </Fragment>
        )
    }
}


export default (SideNavBar)