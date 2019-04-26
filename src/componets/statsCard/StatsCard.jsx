import React from 'react'
import { 
    withStyles, 
    Paper,
    Typography,
    Divider
} from '@material-ui/core'



const styles = theme =>({
    root:{
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText,
        height: '100%'
    },
    mainContainer:{
        display: 'flex',
        padding: theme.spacing.unit*2
    },
    secondaryContent:{
        margin: `${theme.spacing.unit}px ${theme.spacing.unit*2}px`
    },
    title:{
        
    },
    icon:{
        fontSize: '45px'
    },
    info:{
        flex: 1
    },
    divider:{
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit*2,
        marginRight: theme.spacing.unit*2,
    }
})


function StatsCard({classes, icon, title, value, secondary}){
    const NewIcon = React.cloneElement(icon,{
        className: classes.icon,
        fontSize: 'inherit',
        color: 'inherit'
    })
    return(
        <Paper className={classes.root}>
        <div className={classes.mainContainer}>
            <div className={classes.icon}>
                {NewIcon}
            </div>
            <div className={classes.info}>
                <Typography style={{color: '#e5e5e5'}} align="right" component='p' variant="body2" color="inherit">{title}</Typography>
                <Typography color="inherit" align="right" component='p' variant="h5">{value}</Typography>
            </div>
        </div>
        <Divider className={classes.divider}/>
        <div className={classes.secondaryContent}>
            <Typography style={{lineHeight: 1.4}} variant="overline" color="inherit">{secondary}</Typography>
        </div>
        </Paper>
    )
}


export default withStyles(styles)(StatsCard)