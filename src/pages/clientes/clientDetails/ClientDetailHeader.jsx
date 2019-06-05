import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { limitName } from '../../../lib/utilities'
import { Hidden } from '@material-ui/core'

const styles = theme => ({
    title:{
         //marginBottom: `${theme.spacing.unit * 3}px`,
         position: 'relative',
         zIndex: 2,
         color: '#FFF',
         marginTop: '50px',
         fontWeight: 400
    },
    subTitle:{
         marginTop: `${theme.spacing.unit*2}px`,
         position: 'relative',
         zIndex: 2,
         color: '#FFF',
         width: '250px'
    },
    header:{
        display: 'flex',
        //flexDirection: 'column',
        height: '300px',
        background: '#888',
        '&::before':{
             content: `"${''}"`,
             display: 'block',
             position: 'absolute',
             height: '325px',
             width: '100%',
             top: '64px',
             left: '0',
             zIndex: 1,
             background: 'rgba(0,0,0, .7)',
             [theme.breakpoints.down('xs')]:{
                top: 56
            }
     },
     
    },
    headerContent:{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        height: '100%'
    },
    headerActions:{
        color: '#FFF',
        position: 'relative',
        zIndex: 2,
    },
    img:{
         position: 'absolute',
         height: '322px',
         width: '100%',
         objectFit: 'cover',
         top: '64px',
         left: '0',
         filter: 'blur(2px)',
         [theme.breakpoints.down('xs')]:{
            top: 56
        }  
    },
    content:{
        position: 'relative',
        zIndex: 3,
        marginTop: '-80px'
    }
 })


function ClientDetailHeader(props){
    const { classes, client, handleEdit } = props
    return(
        <div className={classes.header}>
            <div className={ classes.headerContent }>
                <img alt={client.country.name} className={classes.img} src={client.country.flag}/>
                <Hidden xsDown implementation="js">
                    <Typography className={classes.title} component="h2" variant="h2">{client.name}</Typography>
                </Hidden>
                <Hidden smUp implementation="js">
                    <Typography className={classes.title} component="h2" variant="h3">{limitName(client.name)}</Typography>
                </Hidden>
                <Button onClick={props.handleAddOrder} size="small" variant="outlined" className={classes.subTitle} color="inherit">Agregar Pedido</Button>
                {/* <Typography className={classes.subTitle} component="span" variant="subtitle1">Estado: Pedido pendiente</Typography>
                <Typography style={{marginTop: 0}} className={classes.subTitle} component="span" variant="subtitle1">ultima actualización: { date }</Typography> */}
            </div>
            <div className={classes.headerActions}>
                <Button
                    onClick={ handleEdit } 
                    color="inherit" 
                    size="small">
                        Editar
                </Button>
            </div>
        </div>
    )
}


export default withStyles(styles)(ClientDetailHeader)