import React from 'react'
import { withStyles } from '@material-ui/core';
import {
    Typography,
    Divider
} from '@material-ui/core'


const styles = theme =>({
    root:{
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        whiteSpace: 'nowrap',
    },
    slide:{
       //height: '250px',
       //width: '100%',
       whiteSpace: 'nowrap',
       overflowY: 'auto',
       //display: 'flex'
       
    },
    item:{
       
    }
})

function OrderSlideList({children, title, classes}){
    return(
        <div className={classes.root}>
            <Typography gutterBottom variant="h3">{title}</Typography>
            <Divider style={{marginBottom: 20}} />
            <div className={classes.slide}>
                {children} 
            </div>
        </div>
    )
}


export default withStyles(styles)(OrderSlideList)