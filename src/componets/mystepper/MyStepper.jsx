import React, { Component } from 'react'
import Stepper from '@material-ui/core/Stepper';



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
        //const step = React.Children.count(children)
        /* const newChildren = React.Children.map(children, element =>{
            return React.cloneElement(element,{
                handleBack: this.handleBack,
                handleNext: this.handleNext,
                handleReset: this.handleReset,
                //step,
                activeStep
            })
        })
 */
        return(
            <Stepper
                activeStep={activeStep}
                orientation="vertical"
            >
                {children}
            </Stepper>
        )
    }
}

export default MyStepper;