import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import classNames from 'classnames'

const styles = theme =>({
    header:{
        //position: 'relative',
        color: '#FFF',
        background: theme.palette.primary.light,
        height: '240px',
        marginLeft: `-${theme.spacing.unit*3}px`,
        marginRight: `-${theme.spacing.unit*3}px`,
        marginTop: `-${theme.spacing.unit*3}px`,
        marginBottom: `-${theme.spacing.unit*10}px`,
        padding: `${theme.spacing.unit*7}px ${theme.spacing.unit*3}px 0px`,
        boxSizing: 'border-box',
        [theme.breakpoints.down('sm')]:{
            marginLeft: -theme.spacing.unit * 2,
            marginRight: -theme.spacing.unit * 2,
            padding: `${theme.spacing.unit*7}px ${theme.spacing.unit*2}px 0px`,
        },
        [theme.breakpoints.down('xs')]:{
            //padding: `${theme.spacing.unit*7}px ${theme.spacing.unit}px 0px`,
            //marginLeft: -theme.spacing.unit,
            //marginRight: -theme.spacing.unit,
            padding: `${theme.spacing.unit*7}px ${12}px 0px`,
            marginLeft: -12,
            marginRight: -12,

        }
    },
    auxBotton: {
        position: 'absolute',
        top: theme.spacing.unit + 64,
        right: theme.spacing.unit
    }
})


function HeaderLayout({ classes, children, className, auxButton, buttonTitle, onClick }){
    return(
        <div className={classNames(classes.header, className)}>
            {
                auxButton &&
                <Button className={classes.auxBotton} size="small" color="inherit" onClick={onClick}>{buttonTitle}</Button>
            }
            {children}
        </div>
    )
}


export default withStyles(styles)(HeaderLayout)

