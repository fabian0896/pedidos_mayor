import React, { Component } from 'react'
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';



class MyStep extends Component {

    render() {

        const { 
            title, 
            children, 
            activeStep,
            handleBack,
            handleNext,
            steps   
        } = this.props

        return (
            <Step>
                <StepLabel>{title}</StepLabel>
                <StepContent>
                    {children}
                <div >
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                     
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
                </StepContent>
            </Step>
        )
    }
}


export default MyStep;