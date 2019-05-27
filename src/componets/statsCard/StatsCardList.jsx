import React from 'react'
import { Grid } from '@material-ui/core'

function StatsCardList(props){
    const { children } = props
    
    return(
        <Grid container spacing={24}>
            {
                React.Children.map(children, child =>{
                    return(
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            {child}
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}


export default StatsCardList