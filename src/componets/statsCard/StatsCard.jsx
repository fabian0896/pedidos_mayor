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
        padding: theme.spacing.unit*3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: `8px solid ${theme.palette.secondary.dark}`,
        transition: '.3s',
        '&:hover':{
            transform: 'scale(1.03)'
        }
    },
    title:{
        
    },
    icon:{
        fontSize: '40px'
    }
})


function StatsCard({classes, icon, title, value}){
    const NewIcon = React.cloneElement(icon,{
        className: classes.icon,
        fontSize: 'inherit',
        color: 'action'
    })
    return(
        <Paper className={classes.root}>
            {NewIcon}
            <Typography align="center" component='p' variant="subtitle1" color="textSecondary">{title}</Typography>
            <Typography align="center" component='p' variant="h5">{value}</Typography>
        </Paper>
    )
}


export default withStyles(styles)(StatsCard)