import React from 'react'
import { withStyles } from '@material-ui/core';


const styles = theme =>({
    root:{
        //minWidth: 0,
        //width: '100%',
        marginLeft: `-${theme.spacing.unit*3}px`,
        marginRight: `-${theme.spacing.unit*3}px`,
        marginTop: `${theme.spacing.unit*5}px`,
        marginBottom: `${theme.spacing.unit*5}px`,
        padding: `${theme.spacing.unit*4}px ${theme.spacing.unit*3}px`,
        boxSizing: 'border-box',
        [theme.breakpoints.down('sm')]:{
            marginLeft: -theme.spacing.unit * 2,
            marginRight: -theme.spacing.unit * 2,
            padding: `${theme.spacing.unit*4}px ${theme.spacing.unit*2}px`,
        },
        [theme.breakpoints.down('xs')]:{
            //padding: `${theme.spacing.unit*7}px ${theme.spacing.unit}px 0px`,
            //marginLeft: -theme.spacing.unit,
            //marginRight: -theme.spacing.unit,
            padding: `${theme.spacing.unit*4}px ${12}px`,
            marginLeft: -12,
            marginRight: -12,

        }
    }
})


function Section({children, classes, background}){
    return(
        <section className={classes.root} style={{background}}>
            {children}
        </section>
    )
}


export default withStyles(styles)(Section)