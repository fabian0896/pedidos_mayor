import React from 'react'
import { withStyles, Typography } from '@material-ui/core'
import BoxIcon from '../../../assets/box.svg'



function getTotals(newArray){
    return newArray.reduce((prev, current)=>{
        const [weight, products] = prev
        return [weight+current.weight, products+current.quantity]
    }, [0, 0])
}



const ListShippingUnits = withStyles(theme=>({
    root:{
        marginTop: theme.spacing.unit*3
    },
    list:{
        listStyle: 'none',
        padding: `${theme.spacing.unit*0}px ${theme.spacing.unit*2}px`,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.grey[300]}`
    },
    listItem:{
        display: 'flex',
        alignItems: 'center',
        margin: `${theme.spacing.unit}px 0`,
    },
    iconWraper:{
        marginRight: theme.spacing.unit*2,
    },
    icon:{
        width: 30
    },
    info:{
        display: 'flex',
        justifyItems: 'center',
        width: '100%',
        //paddingRight: theme.spacing.unit*2,
        '& > :first-child':{
            flex: 1
        },
    },
    resume:{
        borderTop: `1px solid ${theme.palette.grey[300]}`,
           paddingTop: theme.spacing.unit
    }
}))(({value, classes, pendingProducts})=>{
    const [totalWeight, totalProducts] = getTotals(value)
    return(
        <div className={classes.root}>
            <ul className={classes.list}>
            {
                value.map((item, index)=>(
                    <li key={index} className={classes.listItem}>
                        <div className={classes.iconWraper}>
                            <img className={classes.icon} src={BoxIcon} alt="Box"/>
                        </div>
                        <div className={classes.info}>
                            <div>
                                <Typography variant="subtitle1">Caja #{index + 1} ({`${item.weight}Kg`})</Typography>
                                <Typography color="textSecondary">{`${item.width}cm x ${item.height}cm x ${item.large}cm`}</Typography>
                            </div>
                            <div>
                                <Typography align="right" variant="h6">{item.quantity}</Typography>
                                <Typography style={{lineHeight: 1}} align="right" color="textSecondary">Prendas</Typography>
                            </div>
                        </div>
                    </li>
                ))
            }
            <li className={classes.listItem}>
                <div className={classes.info + " " + classes.resume}>
                    <div>
                        <Typography align="left" variant="h6">{`${totalWeight}Kg`}</Typography>
                        <Typography style={{lineHeight: 1}} align="left" color="textSecondary">Peso Total</Typography>
                    </div>
                    <div>
                        <Typography align="right" variant="h6">{`${totalProducts}/${pendingProducts}`}</Typography>
                        <Typography style={{lineHeight: 1}} align="right" color="textSecondary">Prendas Totales</Typography>
                    </div>
                </div>
            </li>
            </ul>
        </div>
    )
})



export default ListShippingUnits