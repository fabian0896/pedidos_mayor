import React from 'react'
import { Modal, withStyles,Typography, Button } from '@material-ui/core'
import classNames from 'classnames'
import { green, amber } from '@material-ui/core/colors'
import PropTypes from 'prop-types';

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 45,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
      top: `${50}%`,
      left: `${50}%`,
      transform: `translate(-${50}%, -${50}%)`,
      overflow: 'hidden',
      borderRadius: theme.shape.borderRadius
    },
    header:{
        marginLeft: -theme.spacing.unit * 4,
        marginTop: -theme.spacing.unit * 4,
        marginRight: -theme.spacing.unit * 4,
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
        background: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        marginBottom: theme.spacing.unit * 3
    },
    title:{
        fontWeight: 500
    },
    content:{
        position: 'relative',
        //minHeight: '200px'
        marginBottom: theme.spacing.unit*4
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
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
  });


function ModalAlert(props){
    
    const {
        classes, 
        onClose, 
        open, 
        title, 
        message, 
        type,
        onConfirm
    } = props
    
    return(
        <Modal
        ria-labelledby="Modal-Multiproposito"
        aria-describedby="modal-para-multiples-propositos"
        open={open}
        onClose={onClose}
        >
            <div className={classes.paper}>
                <div className={classNames(classes.header, classes[type])}>
                    <Typography className={classes.title} color="inherit" component="h3" variant="h5" >{title}</Typography>
                </div>
                <div className={classes.content}>
                    <Typography component="p" variant="subtitle1" color="textSecondary" >{ message }</Typography>
                </div>
                <div className={classes.actions}>
                    <Button
                        onClick={onClose}
                        color="secondary"
                        >Cancelar
                    </Button>
                    <Button
                        onClick={()=>{onConfirm() ; onClose()}}
                        style={{marginLeft: 10}}
                        variant="contained"
                        color="primary"
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