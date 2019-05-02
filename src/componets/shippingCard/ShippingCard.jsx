import React from 'react'
import { withStyles, Paper, Typography, Divider } from '@material-ui/core'
import { getShippingCompany } from '../../lib/enviroment'


const ShippingCard = withStyles(theme=>({
    root:{
        minHeight: 200,
        overflow: 'hidden'
        //padding: `${theme.spacing.unit*3}px ${theme.spacing.unit*2}px`
    },
    header:{
        padding: `${theme.spacing.unit*3}px ${theme.spacing.unit*2}px`,
        boxShadow: theme.shadows[2]
    },
    order:{
        padding: `${theme.spacing.unit*0}px ${theme.spacing.unit*2}px 0px`,
        marginTop: theme.spacing.unit*2,
        display: 'flex',
        //justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        '& > :first-child':{
            flex: 1,
            marginRight: theme.spacing.unit*2
        },
        '& > :last-child':{
            flex: 1,
            marginLeft: theme.spacing.unit*2
        }
    },
    serialCodeContainer:{
        marginTop: -26,
        width: 55,
        height: 55,
        borderRadius: '50%',
        background: theme.palette.background.paper,

    },
    details:{
        marginTop: theme.spacing.unit*2,
        padding: `${theme.spacing.unit*0}px ${theme.spacing.unit*2}px 0px`
    },
    price:{
        padding: `${theme.spacing.unit*2}px ${theme.spacing.unit*2}px ${theme.spacing.unit/2}px`,
        background: theme.palette.grey[300]
    }
}))(({classes})=>{
    const company = getShippingCompany('fedex')
    return(
        <Paper className={classes.root}>
            <div
                style={{
                    background: company.background,
                    color: company.color
                }} 
                className={classes.header}>
                <Typography
                    style={{fontWeight: 600}}
                    color="inherit" 
                    align='center' 
                    variant="h5">
                        202424782
                </Typography>
                <Typography 
                    style={{lineHeight: 1.4}} 
                    align="center" 
                    variant="overline" 
                    color="inherit">
                        FedEx
                </Typography>
            </div>
            <div className={classes.order}>
                <Divider/>
                <div>
                    <Typography style={{lineHeight: 1.2}} align="center" variant="h6">A039</Typography>
                    <Typography align="center" variant="body1" color="textSecondary">Fabian Dueñas</Typography>
                </div>
                <Divider/>
            </div>
            <div className={classes.details}>
                <Typography variant="subtitle2" color="textSecondary" >Dimensiones</Typography>
                <Typography gutterBottom variant="subtitle1">30cm x 30xm x 20cm</Typography>
                
                <Typography variant="subtitle2" color="textSecondary" >Prendas</Typography>
                <Typography gutterBottom variant="subtitle1">40</Typography>
                
                <Typography variant="subtitle2" color="textSecondary" >Peso</Typography>
                <Typography gutterBottom variant="subtitle1">20kg</Typography>

            </div>
            <div className={classes.price}>
                <Typography color="textSecondary" align="center" variant="subtitle2">Precio:</Typography>
                <Typography align="center" variant="h6">$24.000</Typography>
                <Typography color="textSecondary" variant="overline" align="right">10/12/1029</Typography>
            </div>
        </Paper>

    )
})


export default ShippingCard

