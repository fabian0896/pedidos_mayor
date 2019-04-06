import React from 'react'
import { withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core'




const ListContainer = ({children, sm, md}) =>{
    const newChildren = React.Children.map(children, element =>{
        return(
            <Grid item xs={12} sm={6} md={12}>
                {element}
            </Grid> 
        ) 
    })
    return(
        <Grid container spacing={24}>
            {newChildren}
        </Grid>
    )
}


// ------------------------------------------------------------


const styles = theme => ({
    topContainer: {
        padding: `${theme.spacing.unit * 3}px`
    },
    divider: {
        margin: `${theme.spacing.unit * 1}px 0`
    }
})


function TopList(props) {
    const { handleClick, children} = props
    return (
        <ListContainer>
            {
                React.Children.map(children, child => {
                    return React.cloneElement(child,{
                        handleClick
                    })
                })
            }
        </ListContainer>
    )
}

export default withStyles(styles)(TopList)