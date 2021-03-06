import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});


class MyStep extends Component {

    render() {

        const {  
            children, 
            activeStep,
            handleBack,
            handleNext,
            onFinish,
            steps,
            classes   
        } = this.props

        return (
            <Fragment>
                {children}
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Atras
                    </Button>
                    <Button
                      onClick={ onFinish || handleNext}
                      color="primary"
                      variant="contained"
                      className={classes.button}
                    >
                      {(activeStep + 1) === steps ? 'Guardar' : 'Siguiente'}
                    </Button>
                </div>
                </div>
            </Fragment>
        )
    }
}


export default withStyles(styles)(MyStep);