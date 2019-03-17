import React from 'react';
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemIText from '@material-ui/core/ListItemText'
import logo from '../../assets/fajas-logo.png'
import { NavLink } from 'react-router-dom'
import './SideNavBar.css'




class SideNavBar extends React.Component{
    render(){

        const { classes, links, ...rest } = this.props

        return(
            <Drawer
                className={ classes.drawer }
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper
                }}
                anchor="left"
                {...rest}
            >
                <div className={ classes.logoContainer }>
                    <img className={ classes.logo }  src={logo} alt="fajas internacionales" />
                </div>
                <List>
                    {
                        links.map(({ text, route, Icon }) => {
                            return(
                                <NavLink 
                                    to={route} 
                                    key={text}
                                    style={{textDecoration: 'none'}}
                                    activeClassName={ classes.selectedRoute }
                                    >
                                    <ListItem button >
                                        <ListItemIcon><Icon/></ListItemIcon>
                                        <ListItemIText primary={text} />
                                    </ListItem>
                                </NavLink>
                            )
                        })
                    }
                </List>
            </Drawer>
        )
    }
}


export default (SideNavBar)