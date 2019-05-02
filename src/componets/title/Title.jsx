import React from 'react'
import { withStyles, Divider, Typography } from '@material-ui/core';
import classNames from 'classnames'

const styles = theme =>({
    root:{
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing.unit*2
    },  
    textContainer:{
        padding: `${theme.spacing.unit*0}px ${theme.spacing.unit*3}px`
    },
    divider:{
        flex: 20
    },
    left:{
        flex: 1,
    },
    right:{
        flex: 1,
    },
    center:{

    }
})


const Title = ({classes, primary, secondary, align, ...rest})=>(
    <div className={classes.root} {...rest}>
        <Divider className={classNames({[classes.left]: align === 'left'}, classes.divider)}/>
        <div className={classes.textContainer}>
            <Typography align={align} variant="h3">{primary.toUpperCase()}</Typography>   
            <Typography align={align} variant="body1" color="textSecondary">{secondary}</Typography>
        </div>
        <Divider className={classNames({[classes.right]: align === 'right'}, classes.divider)}/>
    </div>
)



export default withStyles(styles)(Title)