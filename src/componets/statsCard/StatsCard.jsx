import React from 'react'
import { 
    withStyles, 
    Paper,
    Typography
} from '@material-ui/core'



const styles = theme =>({
    root:{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        //padding: theme.spacing.unit*3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        //borderTop: `8px solid ${theme.palette.secondary.dark}`,
        transition: '.3s',
        '&:hover':{
            transform: 'scale(1.03)'
        }
    },
    title:{
        
    },
    icon:{
        fontSize: '35px'
    },
    header:{
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing.unit}px ${theme.spacing.unit}px`
    },
    content:{
        flex: 1,
        alignItems: 'center',
        padding: `${theme.spacing.unit*2}px ${theme.spacing.unit}px`
    }
})


function StatsCard({classes, icon, title, value}){
    const NewIcon = React.cloneElement(icon,{
        className: classes.icon,
        fontSize: 'inherit',
        color: 'inherit'
    })
    return(
        <Paper className={classes.root}>
            <div className={classes.header}>
                {NewIcon}
                <Typography align="center" component='p' variant="subtitle1" color="inherit">{title}</Typography>
            </div>
            <div className={classes.content}>
                <Typography color="textSecondary" align="center" component='p' variant="h5">{value}</Typography>
            </div>
        </Paper>
    )
}


export default withStyles(styles)(StatsCard)