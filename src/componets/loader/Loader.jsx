import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';


const styles = theme => ({
    wrapper: {
        position: 'relative',
        display: 'inline-block'
    },
    container:{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    button:{
        height: '100px',
        width: '100px',
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
})


function Loader(props) {
    const { loading, success, classes } = props
    const buttonClassname = classNames({
        [classes.buttonSuccess]: success,
      });
    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <Fab size="large" color="primary" className={classNames(buttonClassname, classes.button)} >
                    {success ? <CheckIcon /> : <SaveIcon />}
                </Fab>
                {loading && <CircularProgress size={112} className={classes.fabProgress} />}
            </div>
        </div>
    )
}

export default withStyles(styles)(Loader)

