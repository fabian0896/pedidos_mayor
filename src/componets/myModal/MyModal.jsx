import React from 'react'
import { Modal, withStyles,Typography, IconButton } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'


const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
      top: `${50}%`,
      left: `${50}%`,
      transform: `translate(-${50}%, -${50}%)`,
      overflow: 'hidden',
      borderRadius: theme.shape.borderRadius,
      [theme.breakpoints.down('sm')]:{
          width: '100%',
          height: '100vh'
      }
    },
    header:{
        position: 'relative',
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
        minHeight: '200px',
        maxHeight: 600,
        overflow: 'auto',
    },
    closeButtom:{
        position: 'absolute',
        right: theme.spacing.unit*2,
        top: theme.spacing.unit*2,
        color: '#FFF',
        opacity: .7
    }
  });


function MyModal(props){
    const {classes,onClose, open, title, children } = props
    
    return(
        <Modal
        ria-labelledby="Modal-Multiproposito"
        aria-describedby="modal-para-multiples-propositos"
        open={open}
        onClose={onClose}
        >
            <div className={classes.paper}>
                <div className={classes.header}>
                    <Typography className={classes.title} color="inherit" component="h3" variant="h5" >{title}</Typography>
                    <IconButton onClick={onClose} className={classes.closeButtom}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                <div className={classes.content}>
                    {children}
                </div>
            </div>
        </Modal>
    )
}



export default withStyles(styles)(MyModal)