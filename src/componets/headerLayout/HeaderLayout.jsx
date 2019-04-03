import React from 'react';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames'

const styles = theme =>({
    header:{
        color: '#FFF',
        background: theme.palette.primary.light,
        height: '240px',
        marginLeft: `-${theme.spacing.unit*3}px`,
        marginRight: `-${theme.spacing.unit*3}px`,
        marginTop: `-${theme.spacing.unit*3}px`,
        marginBottom: `-${theme.spacing.unit*10}px`,
        padding: `${theme.spacing.unit*7}px ${theme.spacing.unit*3}px 0px`,
    }
})


function HeaderLayout(props){
    const { classes, children, className } = props
    return(
        <div className={classNames(classes.header, className)}>
            {children}
        </div>
    )
}


export default withStyles(styles)(HeaderLayout)

