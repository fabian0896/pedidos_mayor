import React, { Fragment, useState } from 'react'
import { withStyles, Paper, Typography, Divider, InputBase, IconButton, Button } from '@material-ui/core'
import { getShippingCompany } from '../../lib/enviroment'
import moment from 'moment'
import NumberFormat from 'react-number-format';
import MyModal from '../myModal/MyModal'
import Resume from '../../pages/envios/newShipping/ShippingResume'
import { 
    Close as CloseIcon, 
    Edit as EditIcon,
    MoreVert as MoreVertIcon
} from '@material-ui/icons'
import * as firebase from '../../lib/firebaseService'
import { withRouter } from 'react-router-dom'

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
        },
        position: "relative"
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
    },
    inputContainer:{
        padding: `0 ${theme.spacing.unit}px`,
        background: 'rgba(255,255,255, .3)',
        borderRadius: theme.shape.borderRadius,
        margin: 2,
        height: 31,
        position: 'relative'
    },
    input:{
        textAlign: 'center', 
        ...theme.typography.h5,
        fontWeight: 600,
        color: 'inherit',
        padding: '0px 30px'
    },
    editButton:{
        position: "absolute",
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)'
    },
    iconButttonRoot:{
        height: 31,
        width: 31
    },
    editShippingButton:{
        margin: `${theme.spacing.unit}px 0`
    }
}))(({classes, shipping, onUpdate, history})=>{
    const company = getShippingCompany(shipping.company)
    const [modalOpen, setOpenModal] = useState(false)
    const [edit, setEdit] =  useState(false)
    const [text, setText] = useState('')

    let clicks = 0
    const handleDobleClick = () => {
        clicks += 1
        const timer = setTimeout(()=>{
            if(clicks < 2){
                handleOpenModal()
            }
            clicks = 0
        }, 200)
        if(clicks === 2){  
            clearTimeout(timer)
            if(!shipping.trackingNumber){
                setEdit(true)
            }
        }
    }

    const handleCancelEdit = ()=>{
        setEdit(false)
    }
    
    const handleCloseModal = ()=>{
        setOpenModal(false)
    }

    const handleOpenModal = () => {
        setOpenModal(true) 
    }

    const handleChange = (event)=>{
        const value = event.target.value
        setText(value)
    }

    const updatetrackingNumber = ()=>{
        firebase.updatetrackingNumber(shipping.id, text).then(()=>{
            setEdit(false)
            onUpdate && onUpdate()
        })
    }

    const handleEdit = ()=>{
        history.push({
            pathname: '/envios/nuevo',
            state: shipping
        })
    }
    

    return(
        <Fragment>

            <MyModal
                title="Envio"
                onClose={handleCloseModal}
                open={modalOpen} >
                <Resume float shipping={shipping}/>
                <Button
                   className={classes.editShippingButton}
                   variant="contained"
                   color="primary"
                   onClick={handleEdit} >
                    Editar
                </Button>
            </MyModal>

            <Paper className={classes.root}>
            {
                !edit?
                <div
                    onClick={handleDobleClick}
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
                :
                <div
                    style={{
                        background: company.background,
                        color: company.color
                    }} 
                    className={classes.header}>
                        <dir className={classes.inputContainer}>
                            <InputBase
                                value={text}
                                onChange={handleChange}
                                autoFocus
                                style={{
                                    height: '100%', 
                                    width: '100%',
                                    color: company.color
                                }}
                                classes={{
                                    input: classes.input
                                }} />
                               {
                                   !text?
                                   <IconButton
                                        onClick={handleCancelEdit}
                                        style={{color: company.color}} 
                                        className={classes.editButton}>
                                       <CloseIcon fontSize="small"/>
                                   </IconButton>
                                   :
                                   <IconButton
                                        onClick={updatetrackingNumber} 
                                        style={{color: company.color}} 
                                        className={classes.editButton}>
                                        <EditIcon fontSize="small"/>
                                   </IconButton>
                               }
                        </dir>
                        <Typography 
                            style={{lineHeight: 1.4}} 
                            align="center" 
                            variant="overline" 
                            color="inherit">
                                {shipping.company}
                        </Typography>
                </div>

            }
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


export default withRouter(ShippingCard)

