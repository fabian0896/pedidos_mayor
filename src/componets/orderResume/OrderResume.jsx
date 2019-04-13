import React from 'react'
import { withStyles } from '@material-ui/core';
import { Paper, Typography, Divider  } from '@material-ui/core'


const styles = theme =>({
    root:{
        //height: 200,
        display: 'inline-flex',
        overflow: 'hidden'
    },
    header:{
        background: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing.unit*2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    productNumber:{
        marginTop: -12
    },
    content:{
        flex: 1,
        padding: `${theme.spacing.unit*2}px ${theme.spacing.unit*2}px`
    },
    contentHeader:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.unit
    },
    flag:{
        maxHeight: '25px',
        borderRadius: theme.shape.borderRadius
    },
    info:{
        marginTop: theme.spacing.unit,
        display: 'flex',
    },
    basicInfo:{
        flex: 1,
    },
    moneyInfo:{

    }
})


function OrderResume(props){
    const { classes, width } = props 
    let myWidth = '100%'
    if(width){
        myWidth = width
    }
    return(
        <Paper style={{width: myWidth}} className={classes.root}>
            <div className={classes.header}>
                <Typography align="center" color="inherit" component="h6" variant="h5">A024</Typography>
                <Typography align="center" color="inherit" component="p" variant="overline">Prendas</Typography>    
                <Typography className={classes.productNumber} align="center" color="inherit" component="p" variant="overline">95</Typography>    
            </div>
            <div className={classes.content}>
                <div className={classes.contentHeader}>
                    <div>
                        <Typography component="span" variant="h6">Lady Lozada</Typography>
                        <Typography component="span" variant="subtitle2" color="textSecondary">Neiva, Colombia</Typography>
                    </div>
                    <div>
                        {/* <img className={classes.flag} src="https://restcountries.eu/data/col.svg" alt="flag"/> */}
                        <Typography component="span" variant="h6" color="textSecondary" >$400.000</Typography>
                    </div>
                </div>
                <Divider/>
                <div className={classes.info}>
                    <div className={classes.basicInfo}>
                        <Typography variant="body2" color="textSecondary">Estao:</Typography>
                        <Typography gutterBottom  variant="body1">En Produccion</Typography>
                        
                        <Typography  variant="body2" color="textSecondary">Fecha:</Typography>
                        <Typography  gutterBottom variant="body1">08/06/2019</Typography>

                        <Typography  variant="body2" color="textSecondary">Encargado:</Typography>
                        <Typography  variant="body1">Fabian David</Typography>
                    </div>
                    <div className={classes.moneyInfo}>
                        <Typography align="right" variant="body2" color="textSecondary">Saldo:</Typography>
                        <Typography gutterBottom align="right" variant="body1">$100.000</Typography>
                        
                        <Typography align="right" variant="body2" color="textSecondary">Pagado:</Typography>
                        <Typography align="right" variant="body1">$300.000</Typography>
                    </div>
                </div>
            </div>
        </Paper>
    )
}



export default withStyles(styles)(OrderResume)