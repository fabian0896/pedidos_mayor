import React, { Fragment } from 'react'
import { Modal, withStyles,Typography, Button } from '@material-ui/core'
import classNames from 'classnames'
import { green, amber } from '@material-ui/core/colors'
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';



const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
}


const styles = theme => ({
    paper: {
      position: 'absolute',
      width: 250,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      outline: 'none',
      top: `${50}%`,
      left: `${50}%`,
      transform: `translate(-${50}%, -${50}%)`,
      overflow: 'hidden',
      borderRadius: theme.shape.borderRadius
    },
    header:{
        margin: `${theme.spacing.unit*3}px ${theme.spacing.unit*3}px 0`,
        color: theme.palette.secondary.contrastText,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    title:{
        fontWeight: 500
    },
    content:{
        position: 'relative',
        //minHeight: '200px'
        margin: `${theme.spacing.unit*3}px ${theme.spacing.unit*3}px ${theme.spacing.unit*2}px`,
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: `0px ${theme.spacing.unit*3}px ${theme.spacing.unit*2}px`,
    },
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icone:{
        fontSize: 80,
    },
    contentMessage:{
        color: 'hsla(0,0%,100%,.8)'
    },
    cancelButtom:{
        color: '#FFF',
        opacity: '.7'
    },
    confirmButtom:{
        color: '#FFF'
    },
    closeButtom:{
        color: '#FFF',
        opacity: '.7',
        position: 'absolute',
        right: -10,
        top: -10
    }
  });


function ModalAlert(props){
    
    const {
        classes, 
        onClose, 
        open, 
        message, 
        type,
        onConfirm,
        hideContent,
        children
    } = props
    const Icone = variantIcon[type]
    return(
        <Modal
        ria-labelledby="Modal-Multiproposito"
        aria-describedby="modal-para-multiples-propositos"
        open={open}
        onClose={onClose}
        >
            <div className={classNames(classes.paper, classes[type])}>
                {
                    !hideContent &&
                    <Fragment>
                        <div className={classNames(classes.header)}>
                            <div >
                                <IconButton onClick={onClose} className={classes.closeButtom} >
                                    <CloseIcon fontSize="small"/>
                                </IconButton>
                                <Icone  className={classNames(classes.icone)}/>
                            </div>
                        </div>
                        <div className={classes.content}>
                            <Typography
                                className={classes.contentMessage} 
                                align="center" 
                                component="p" 
                                variant="subtitle1" 
                                color="inherit" >
                                    { message }
                            </Typography>
                        </div>
                    </Fragment>
                }
                <div>
                    {children}  
                </div>
                <div className={classes.actions}>
                    <Button
                        size="small"
                        onClick={onClose}
                        color="inherit"
                        className={classes.cancelButtom}
                        >Cancelar
                    </Button>
                    <Button
                        size="small"
                        className={classes.confirmButtom}
                        onClick={()=>{onConfirm()}}
                        style={{marginLeft: 10}}
                        color="inherit"
                        >Continuar
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

ModalAlert.prototype={
    classes: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['success', 'error', 'info', 'warning' ])
}



export default withStyles(styles)(ModalAlert)