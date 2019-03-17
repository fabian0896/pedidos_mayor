import React from 'react'
import NavBar from '../navBar/NavBar';
import SideNavBar from '../sideNavBar/SideNavBar';
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const styles = theme => ({
    root:{
        display: 'flex'
    },
    drawerPaper:{
        width: drawerWidth
    },
    drawer:{
        width: drawerWidth,
        flexShrink: 0,
    },
    navBar:{
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    logo: {
        width: '90%'
    },
    logoContainer:{
        ...theme.mixins.toolbar,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
      },

})


class Layout extends React.Component{
    
    
    
    render(){
        
        const { classes, children } = this.props
        
        const links = [
            {
                text: 'Inicio',
                route: 'inicio'
            },
            {
                text: 'Clientes',
                route: 'clientes'
            },
            {
                text: 'Pagos',
                route: 'pedidos'
            },
            {
                text: 'Prendas',
                route: 'prendas'
            },
            {
                text: 'Estadisticas',
                route: 'estadisticas'
            },
            {
                text: 'Notificaciones',
                route: 'notificaciones'
            }
        ]
        
        return(
            <div className={ classes.root }>
                <CssBaseline />
                <NavBar className={ classes.navBar } />
                
                <SideNavBar 
                    links={links}
                    classes={ classes }
                     />
                <main className={ classes.content }>
                <div className={ classes.toolbar } />
                    { children }
                </main>
            </div>
        )
    }
}


export default withStyles(styles)(Layout);