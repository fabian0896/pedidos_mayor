import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

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
         marginTop: `${theme.spacing.unit}px`,
         position: 'relative',
         zIndex: 2,
         color: '#FFF',
         width: '300px'
    },
    header:{
        display: 'flex',
        flexDirection: 'column',
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
             background: 'rgba(0,0,0, .7)'
     }
    },
    img:{
         position: 'absolute',
         height: '322px',
         width: '100%',
         objectFit: 'cover',
         top: '64px',
         left: '0',
         filter: 'blur(2px)'    
    },
    content:{
        position: 'relative',
        zIndex: 3,
        marginTop: '-80px'
    }
 })


function ClientDetailHeader(props){
    const { classes, client } = props
    return(
        <div className={classes.header}>
            <img className={classes.img} src={client.country.flag}/>
            <Typography className={classes.title} component="h2" variant="h2">{client.name}</Typography>
            <Typography className={classes.subTitle} component="span" variant="subtitle1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, nesciunt?</Typography>
        </div>
    )
}


export default withStyles(styles)(ClientDetailHeader)