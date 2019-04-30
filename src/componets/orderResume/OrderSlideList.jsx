import React from 'react'
import { withStyles } from '@material-ui/core';
import NotFound from '../notFound/NotFound'


const styles = theme =>({
    root:{
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        whiteSpace: 'nowrap',
        //padding: `${theme.spacing.unit*3}px 0px` 
    },
    slide:{
       //height: '250px',
       //width: '100%',
       whiteSpace: 'nowrap',
       overflowY: 'auto',
       padding: `${theme.spacing.unit}px 0px` 
       //display: 'flex'
    },
    item:{
        display: 'inline',
       '&:nth-child(n + 2)':{
           marginLeft: 15
       },
       '&:last-child':{
           marginRight: 5
       }
    }
})

function OrderSlideList({children, classes, noItemMessage, noItemTitle}){
    return(
        <div className={classes.root}>
        {
            React.Children.count(children) > 0 ?
            <div className={classes.slide}>
                {
                    React.Children.map(children, (child)=>{
                        return(
                            <div className={classes.item}>
                                {child}  
                            </div>
                        )
                    })
                }
            </div>
            :
            <NotFound 
                title={noItemTitle}
                message={noItemMessage} />
        }
        </div>
    )
}


export default withStyles(styles)(OrderSlideList)