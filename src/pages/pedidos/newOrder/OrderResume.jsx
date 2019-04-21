import React from 'react'
import { withStyles, Typography, Divider } from '@material-ui/core'

const styles = theme =>({
    root:{
        marginTop: theme.spacing.unit*2
    }
})


function OrderResume(props){
    const { classes } = props
    return(
        <div className={classes.root}>
            <Typography variant="h5">Fabian David Dueñas</Typography>
            <Typography color="textSecondary" variant="body1">Cali, Colombia</Typography>
            <Divider/>
        </div>
    )
}

export default withStyles(styles)(OrderResume)