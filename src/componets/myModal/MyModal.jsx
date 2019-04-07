import React from 'react'
import { Modal, withStyles,Typography } from '@material-ui/core'


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
        minHeight: '200px'
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
                </div>
                <div className={classes.content}>
                    {children}
                </div>
            </div>
        </Modal>
    )
}



export default withStyles(styles)(MyModal)