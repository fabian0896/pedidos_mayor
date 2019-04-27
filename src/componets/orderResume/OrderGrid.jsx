import React from 'react'
import {
    Typography,
    Grid,
    Paper,
    withStyles
} from '@material-ui/core'
import SearchSvg from '../../assets/search.svg'

const styles = theme => ({
    paper:{
        marginBottom: theme.spacing.unit*3,
        height: 250,
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${theme.spacing.unit*3}px ${theme.spacing.unit*5}px`
    },
    grid:{
        marginBottom: theme.spacing.unit*3,
    },
    svg:{
        width: 100,
        color: theme.palette.text.secondary,
        paddingLeft: theme.spacing.unit*2
    },
    textContainer:{
        maxWidth: 350
    }
})


function OrederGrid({children, classes}){
    return(
        <div>
            {
                React.Children.count(children) ?
                <Grid className={classes.grid} container spacing={24}>
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
                :
                <Paper className={classes.paper}>
                    <div className={classes.textContainer}>
                        <Typography color="textSecondary" gutterBottom variant="h4">No se encontraron pedidos</Typography>
                        <Typography color="textSecondary" variant="body1">
                            Intenta cambiando el termino de busqueda o agrega el pedido
                        </Typography>
                    </div>
                    <img className={classes.svg} src={SearchSvg} alt="search"/>
                </Paper>
            }
        </div>
    )
}

export default withStyles(styles)(OrederGrid)