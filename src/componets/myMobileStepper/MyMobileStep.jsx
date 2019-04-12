import React from 'react'
import { withStyles } from '@material-ui/core';

const styles = theme =>({
    root: {
        marginBottom: theme.spacing.unit*10
    }
})


function MyMobileStep(props){
    const { classes } = props
    return(
        <div className={classes.root}>
            {props.children}
        </div>
    )
}

export default withStyles(styles)(MyMobileStep)