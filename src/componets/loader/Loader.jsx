import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography'

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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    stateText:{
        marginTop: `${theme.spacing.unit*2}px`
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
    const { 
        loading, 
        success, 
        classes, 
        Icon,
        successText,
        loadingText
    } = props
    const buttonClassname = classNames({
        [classes.buttonSuccess]: success,
      });
    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <Fab size="large" color="primary" className={classNames(buttonClassname, classes.button)} >
                    {success ? <CheckIcon /> : <Icon />}
                </Fab>
                {loading && <CircularProgress size={112} className={classes.fabProgress} />}
            </div>
            {
                success?
                <Typography className={classes.stateText} component="span" variant="subtitle1">{successText}</Typography>
                :
                <Typography className={classes.stateText} component="span" variant="subtitle1">{loadingText}</Typography>
            }
            
        </div>
    )
}

export default withStyles(styles)(Loader)

