import React from 'react'
import NavBar from '../navBar/NavBar';
import SideNavBar from '../sideNavBar/SideNavBar';
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import { 
    AccessibilityNew, 
    Home,
    FlightTakeoff,
    InsertChart,
    Notifications,
    Group,
    AttachMoney,
    Widgets
 } from '@material-ui/icons'

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
    slectedRoute:{
        color: 'red'
    }

})


const links = [
    {
        text: 'Inicio',
        route: '/inicio',
        Icon: Home
    },
    {
        text: 'Clientes',
        route: '/clientes',
        Icon: Group
    },
    {
        text: 'Pagos',
        route: '/pagos',
        Icon: AttachMoney
    },
    {
        text: 'Pedidos',
        route: '/pedidos',
        Icon: Widgets
    },
    {
        text: 'Prendas',
        route: '/prendas',
        Icon: AccessibilityNew
    },
    {
        text: 'Estadisticas',
        route: '/estadisticas',
        Icon: InsertChart
    },
    ,{
        text: 'Envios',
        route: '/envios',
        Icon: FlightTakeoff
    },
    {
        text: 'Notificaciones',
        route: '/notificaciones',
        Icon: Notifications
    }
]


class Layout extends React.Component{
    
    
    
    render(){
        
        const { classes, children, title } = this.props
        
        return(
            <div className={ classes.root }>
                <CssBaseline />
                <NavBar title={title} className={ classes.navBar } />
                
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