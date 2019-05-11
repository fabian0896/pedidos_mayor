import React, { Fragment, useState } from 'react'
import { withStyles, Paper, Typography, Divider } from '@material-ui/core'
import { getShippingCompany } from '../../lib/enviroment'
import moment from 'moment'
import NumberFormat from 'react-number-format';
import MyModal from '../myModal/MyModal'
import Resume from '../../pages/envios/newShipping/ShippingResume'

const MoneyValue = ({amount, children})=>(
    <NumberFormat 
        value={amount} 
        displayType={'text'} 
        thousandSeparator={true} 
        prefix={'$'} 
        renderText={value => (
            React.cloneElement(children, {
                children: value
            })
        )}
        />
)

const ShippingCard = withStyles(theme=>({
    root:{
        minHeight: 200,
        overflow: 'hidden',
        //display: 'inline-block',
        //height: '100%',
        //padding: `${theme.spacing.unit*3}px ${theme.spacing.unit*2}px`
    },
    header:{
        padding: `${theme.spacing.unit*3}px ${theme.spacing.unit*2}px`,
        boxShadow: theme.shadows[2],
        cursor: 'pointer',
        '&:hover':{
            boxShadow: theme.shadows[5],
        }
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
        marginBottom: theme.spacing.unit*2,
        padding: `${theme.spacing.unit*0}px ${theme.spacing.unit*2}px 0px`,
        display: 'flex',
        '& > *':{
            flex: 1
        }
    },
    shippingUnits:{
        padding: `${theme.spacing.unit*2}px ${theme.spacing.unit*2}px`,
        height: '100px',
        overflow: 'auto'
    },
    price:{
        padding: `${theme.spacing.unit*2}px ${theme.spacing.unit*2}px ${theme.spacing.unit/2}px`,
        background: theme.palette.grey[300]
    }
}))(({classes, shipping})=>{
    const company = getShippingCompany(shipping.company)
    const [modalOpen, setOpenModal] = useState(false)
    
    const handleCloseModal = ()=>{
        setOpenModal(false)
    }

    const handleOpenModal = () => {
        setOpenModal(true) 
    }

    return(
        <Fragment>

            <MyModal
                title="Envio"
                onClose={handleCloseModal}
                open={modalOpen} >
                <Resume float shipping={shipping}/>
            </MyModal>

            <Paper className={classes.root}>
                <div
                    onClick={handleOpenModal}
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
                            {shipping.trackingNumber || 'Pendiente'}
                    </Typography>
                    <Typography 
                        style={{lineHeight: 1.4}} 
                        align="center" 
                        variant="overline" 
                        color="inherit">
                            {shipping.company}
                    </Typography>
                </div>
                <div className={classes.order}>
                    <Divider/>
                    <div>
                        <Typography style={{lineHeight: 1.2}} align="center" variant="h6">{shipping.order.label}</Typography>
                        <Typography align="center" variant="body1" color="textSecondary">{shipping.order.secondary}</Typography>
                    </div>
                    <Divider/>
                </div>
                <div className={classes.details}>
                    <div>
                        <Typography align="center"  variant="subtitle1">{shipping.totalProducts}</Typography>
                        <Typography gutterBottom align="center" variant="subtitle2" color="textSecondary" >Prendas</Typography>
                    </div>
                    <div>
                        <Typography align="center"  variant="subtitle1">{shipping.paymentMethod === 'payHere'? 'Cuenta': 'Contra entrega'}</Typography>
                        <Typography gutterBottom align="center" variant="subtitle2" color="textSecondary" >Pago</Typography>
                    </div>
                    <div>
                        <Typography align="center"  variant="subtitle1">{`${shipping.totalWeight}Kg`}</Typography>
                        <Typography gutterBottom align="center" variant="subtitle2" color="textSecondary" >Peso</Typography>
                    </div>
                </div>
                <Divider/>
                <div className={classes.shippingUnits}>
                    {
                        shipping.shippingUnits.map((unit, index)=>(
                            <Fragment key={index}>
                                <Typography variant="subtitle2" color="textSecondary" >Caja #{index+1}</Typography>
                                <Typography gutterBottom variant="subtitle1">{`${unit.height}cm x ${unit.width}cm x ${unit.large}cm`}</Typography>
                            </Fragment>
                        ))
                    }
                </div>
                <div className={classes.price}>
                    <Typography color="textSecondary" align="center" variant="subtitle2">Precio:</Typography>
                    <MoneyValue amount={shipping.price}>
                        <Typography align="center" variant="h6"/>
                    </MoneyValue>
                    <Typography color="textSecondary" variant="overline" align="right">{moment(shipping.createdAt.seconds*1000).format('DD/MM/YYYY')}</Typography>
                </div>
            </Paper>
        </Fragment>

    )
})


export default ShippingCard

