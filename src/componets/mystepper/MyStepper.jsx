import React, { Component } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step'
import StepContent from '@material-ui/core/StepContent'
import StepLabel from '@material-ui/core/StepLabel'


class MyStepper extends Component{

    state ={
        activeStep: 0
    }

    handleNext = () => {
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
      };
    
      handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1,
        }));
      };
    
      handleReset = () => {
        this.setState({
          activeStep: 0,
        });
      };

    render(){
        const { children } = this.props 
        const { activeStep } = this.state
        const steps = React.Children.count(children)
        const newChildren = React.Children.map(children, element =>{
            return React.cloneElement(element,{
                handleBack: this.handleBack,
                handleNext: this.handleNext,
                handleReset: this.handleReset,
                steps,
                activeStep
            })
        })
        const finalChildren = React.Children.map(newChildren, element => {
          return <Step>
            <StepLabel>{ element.props.title }</StepLabel>
            <StepContent>
              {element}
            </StepContent>
          </Step>
        })
 
        return(
            <Stepper
                activeStep={activeStep}
                orientation="vertical"
            >
                {finalChildren}
            </Stepper>
        )
    }
}

export default MyStepper;