import React from 'react'
import {
    Typography,
    Grid,
    Divider
} from '@material-ui/core'


function OrederGrid({children, title}){
    return(
        <div>
            <Typography gutterBottom variant="h3">{title}</Typography>
            <Divider style={{marginBottom: 20}} />
            <Grid container spacing={24}>
                {
                    React.Children.map(children,child =>{
                        return(
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                {child}
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

export default OrederGrid