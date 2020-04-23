import React, { useState, useCallback, Fragment } from 'react'
import { Paper, withStyles, Avatar, Typography, Divider, IconButton, MenuItem, Menu, CircularProgress } from '@material-ui/core';
import { getNameLetters } from '../../../lib/utilities'
import NumberFormat from 'react-number-format';
import moment from 'moment'
import { Print as PrintIcon, Timeline as TimelineIcon } from '@material-ui/icons'
import { STATES } from '../../../lib/enviroment'
import { changeOrderState } from '../../../lib/firebaseService'
import { connect } from 'react-redux'

const styles = theme => ({
    root: {
        width: '100%',
        overflow: 'hidden',
        marginBottom: theme.spacing.unit * 2
    },
    flagContainer: {
        width: '100%',
        position: 'relative',
        paddingBottom: '-5px',
        '&:before': {
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
    header: {
        position: 'relative'
    },
    stateButton: {
        position: 'absolute',
        top: theme.spacing.unit,
        right: theme.spacing.unit,
        zIndex: 100,
        color: '#FFF'
    },
    printButton: {
        position: 'absolute',
        top: theme.spacing.unit,
        left: theme.spacing.unit,
        zIndex: 100,
        color: '#FFF'
    },
    flag: {
        width: '100%',
        [theme.breakpoints.down('md')]: {
            height: 200,
            objectFit: 'cover'
        }
    },
    avatarContainer: {
        marginTop: '-55px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        //marginBottom: theme.spacing.unit 
    },
    avatar: {
        fontSize: '30px',
        width: '100px',
        height: '100px',
        border: '4px solid #FFF',
        boxSizing: 'border-box'
    },
    content: {
        padding: theme.spacing.unit * 2,
    },
    resumeContent: {
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        width: '100%',
        '& div': {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    divider: {
        marginBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2
    }
})

function OrderDetailsCard(props) {
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorElReport, setAnchorElReport] = useState(null)
    const [loadinResume, setLoadingResume] = useState(false)
    const { classes, order, client, onUpdate, handlePrintResume, handlePrintProductionResume ,seller } = props
    const country = client.country.translations.es || client.country.name
    const date = moment(order.createdAt.seconds * 1000).format('DD/MM/YYYY')

    const stateList = Object.keys(STATES).map(id => ({ ...STATES[id], key: id }))

    function handleClick(event) {
        setAnchorEl(event.currentTarget)
    }

    function handleClickReport(event) {
        setAnchorElReport(event.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null)
    }

    function handleCloseReport() {
        setAnchorElReport(null)
    }

    const handleChangeState = useCallback((state) => async () => {
        await changeOrderState(order.id, state)
        handleClose()
        onUpdate && onUpdate()
    })


    const getClientReport = ()=>{
        handlePrintResume(setLoadingResume)()
        handleCloseReport()
    }

    const getProductionReport = (type) => ()=>{
        handlePrintProductionResume(setLoadingResume)(type)
        handleCloseReport()
    }

    const areTherePowernet = (order) =>{
        const {products} = order
        return products.some(product => product.line === "powernet")
    }

    const areThereLatex = (order) =>{
        const {products} = order
        return products.some(product => product.line !== "powernet")
    }


    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
                <IconButton
                    onClick={handleClick}
                    className={classes.stateButton}>
                    <TimelineIcon fontSize="large" />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
                    {
                        stateList.map((state, index) => (
                            <MenuItem
                                disabled={state.key === order.state}
                                key={index}
                                onClick={handleChangeState(state.key)}>
                                {state.name}
                            </MenuItem>
                        ))
                    }
                </Menu>
                {
                    loadinResume ?
                        <CircularProgress className={classes.printButton} color="inherit" />
                        :
                        <Fragment>
                            <IconButton onClick={handleClickReport} className={classes.printButton}>
                                <PrintIcon fontSize="large" />
                            </IconButton>
                            <Menu
                                anchorEl={anchorElReport}
                                open={Boolean(anchorElReport)}
                                onClose={handleCloseReport}
                            >
                                <MenuItem onClick={getClientReport}>Reporte Cliente</MenuItem>
                                <MenuItem disabled={!areThereLatex(order)} onClick={getProductionReport('latex')}>Produccion Latex</MenuItem>
                                <MenuItem disabled={!areTherePowernet(order)} onClick={getProductionReport('powernet')}>Produccion Powernet</MenuItem>
                            </Menu>
                        </Fragment>
                }
                <div className={classes.flagContainer}>
                    <img className={classes.flag} src={client.country.flag} alt={client.country.name} />
                </div>
                <div className={classes.avatarContainer} >
                    <Avatar style={{ background: `rgb(${client.personalColor.join(',')})` }} className={classes.avatar}>{getNameLetters(client.name)}</Avatar>
                </div>
                <div className={classes.content}>
                    <Typography component="h6" variant="h5" align="center">{client.name}</Typography>
                    <Typography gutterBottom component="span" variant="subtitle1" color="textSecondary" align="center" >{`${client.city}, ${country}`}</Typography>

                    <div className={classes.resumeContent}>
                        <div>
                            <Typography variant="subtitle2" align="center">{order.descount}%</Typography>
                            <Typography color="textSecondary" variant="body1" align="center">Descuento</Typography>
                        </div>
                        <div>
                            <NumberFormat
                                value={parseFloat(order.total).toFixed(1)}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={`${order.currency === 'COP' ? '' : order.currency + ' '}$`}
                                renderText={value => (
                                    <Typography variant="subtitle2" align="center">{value}</Typography>
                                )} />
                            <Typography color="textSecondary" variant="body1" align="center">Valor</Typography>
                        </div>
                        <div>
                            <Typography variant="subtitle2" align="center">{order.totalProducts}</Typography>
                            <Typography color="textSecondary" variant="body1" align="center">Prendas</Typography>
                        </div>
                    </div>

                    <Divider className={classes.divider} />

                    <Typography component="span" variant="subtitle2" color="textSecondary">Estado:</Typography>
                    <Typography gutterBottom component="span" variant="subtitle1">{STATES[order.state].short}</Typography>

                    <Typography component="span" variant="subtitle2" color="textSecondary">Fecha:</Typography>
                    <Typography gutterBottom component="span" variant="subtitle1">{date}</Typography>

                    <Typography component="span" variant="subtitle2" color="textSecondary">Encargado/a:</Typography>
                    <Typography gutterBottom component="span" variant="subtitle1">{seller.name}</Typography>
                </div>
            </div>
        </Paper>
    )
}


const mapStateToProps = (state, props) => {

    return {
        seller: state.sellers[props.client.seller]
    }
}

export default connect(mapStateToProps)(withStyles(styles)(OrderDetailsCard))