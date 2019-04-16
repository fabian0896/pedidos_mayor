import React from 'react'
import { Paper, withStyles, Avatar, Typography, Divider } from '@material-ui/core';


const styles = theme =>({
    root:{
        width: '100%',
        overflow: 'hidden',
        marginBottom: theme.spacing.unit*2
    },
    flagContainer:{
        width: '100%',
        position: 'relative',
        paddingBottom: '-5px',
        '&:before':{
            content: "''",
            display: 'block',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,.7), rgba(0,0,0, .4) 80%, rgba(0,0,0, .0))'
        }
    },
    flag:{
        width: '100%',
        [theme.breakpoints.down('md')]:{
            height: 200,
            objectFit: 'cover'
        }  
    },
    avatarContainer:{
        marginTop: '-55px',
        width: '100%',
        display:'flex',
        justifyContent: 'center',
        //marginBottom: theme.spacing.unit 
    },
    avatar:{
        fontSize: '30px',
        width: '100px',
        height: '100px',
        border: '4px solid #FFF',
        boxSizing: 'border-box'
    },
    content:{
        padding: theme.spacing.unit*2,
    },
    resumeContent:{
        marginTop: theme.spacing.unit*3,
        display: 'flex',
        width: '100%',
        '& div':{
            flex: 1
        }
    },
    divider:{
        marginBottom: theme.spacing.unit*2,
        marginTop: theme.spacing.unit*2
    }
})

function OrderDetailsCard(props) {
    const { classes } = props
    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
                <div className={classes.flagContainer}>
                    <img className={classes.flag} src="https://restcountries.eu/data/col.svg" alt="Colombia"/>
                </div>
                <div className={classes.avatarContainer} >
                    <Avatar className={classes.avatar}>FD</Avatar>
                </div>
                <div className={classes.content}>
                    <Typography component="h6" variant="h5" align="center">Fabian David Dueñas</Typography>
                    <Typography gutterBottom component="span" variant="subtitle1" color="textSecondary" align="center" >Cali, Colombia</Typography>

                    <div className={classes.resumeContent}>
                        <div>
                            <Typography variant="subtitle2" align="center">95</Typography>
                            <Typography color="textSecondary" variant="body1" align="center">Prendas</Typography>
                        </div>
                        <div>
                            <Typography variant="subtitle2" align="center">$400.000</Typography>
                            <Typography color="textSecondary" variant="body1" align="center">Valor</Typography>
                        </div>
                        <div>
                            <Typography variant="subtitle2" align="center">95</Typography>
                            <Typography color="textSecondary" variant="body1" align="center">Prendas</Typography>
                        </div>
                    </div>
                    
                    <Divider className={classes.divider}/>

                    <Typography component="span" variant="subtitle2" color="textSecondary">Estado:</Typography>
                    <Typography gutterBottom component="span" variant="subtitle1">En Producción</Typography>
                    
                    <Typography component="span" variant="subtitle2" color="textSecondary">Fecha:</Typography>
                    <Typography gutterBottom component="span" variant="subtitle1">08/06/2019</Typography>
                    
                    <Typography component="span" variant="subtitle2" color="textSecondary">Encargado:</Typography>
                    <Typography gutterBottom component="span" variant="subtitle1">Fabian David Dueñas</Typography>
                </div>
            </div>
        </Paper>
    )
}


export default withStyles(styles)(OrderDetailsCard)