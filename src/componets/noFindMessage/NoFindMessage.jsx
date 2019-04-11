import React from 'react'
import { Typography, Paper, withStyles, Button } from '@material-ui/core'



const styles = theme =>({
    root:{
        display: 'flex',
        minHeight: '250px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        //marginBottom: '10px'
    },
    button:{
        marginTop: theme.spacing.unit*3
    }
})

function NoFindMessage(props){
    const { message, subMessage, callToAction, cta, classes } = props
    return(
        <Paper className={classes.root}>
            <Typography className={classes.title} gutterBottom component="span" variant="subtitle1">{ message }</Typography>
            <Typography className={classes.title} gutterBottom component="span" variant="overline">{ subMessage }</Typography>
            <Button className={classes.button} color="primary"  onClick={cta} >{callToAction}</Button>
        </Paper>
    )
}

export default withStyles(styles)(NoFindMessage)