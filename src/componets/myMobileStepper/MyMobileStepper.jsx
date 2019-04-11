import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';



const styles = theme =>({
    header:{
        marginLeft: -12,
        marginRight: -12,
        marginTop: -12,
        marginBottom: theme.spacing.unit*3,
        padding: `${theme.spacing.unit*3}px 12px`,
        background: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        [theme.breakpoints.down('sm')]:{
            padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px` ,
            marginLeft: -theme.spacing.unit*2,
            marginRight: -theme.spacing.unit*2,
            marginTop: -theme.spacing.unit*2,
        },
    },
    title:{
        fontWeight: 500
    }
})


class MyMobileStepper extends Component{
    
    state ={
        activeStep: this.props.activeStep || 0,
        childrenPros: []
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

    componentDidMount(){
        const { children } = this.props
        const childrenPros = React.Children.map(children, child =>{
            return {
                title: child.props.title,
                handleNext: child.props.handleNext,
                handleBack: child.props.handleBack,
                buttonTitle: child.props.buttonTitle,
                backButtonTitle: child.props.backButtonTitle
            } 
        })
        this.setState({childrenPros})
    }
    
    render(){
        const { classes, children, handleInitialBack,initialBackTitle, step } = this.props
        const { childrenPros, activeStep } = this.state

        const steps = React.Children.count(children)

        const stepContent = React.Children.toArray(children)

        return(
            <div>
                <div className={classes.header} >
                    <Typography
                        className={classes.title} 
                        component="h2" 
                        variant="h4" 
                        color="inherit">
                        {childrenPros[step || activeStep] && childrenPros[step || activeStep].title}
                    </Typography>
                </div>
                <div>
                    {stepContent[step || activeStep]}
                </div>

                <MobileStepper 
                    steps={steps}
                    position="bottom"
                    activeStep={step || this.state.activeStep}
                    nextButton={
                        <Button 
                            size="medium" 
                            onClick={(childrenPros[step || activeStep] && childrenPros[step || activeStep].handleNext) || this.handleNext} >
                            {(childrenPros[step || activeStep] && childrenPros[step || activeStep].buttonTitle) || 'Siguiente'}
                            <KeyboardArrowRight/>
                        </Button>
                    }
                    backButton={
                        <div>
                            <Button
                                color="secondary" 
                                 size="medium"
                                onClick={((step || activeStep) === 0)? handleInitialBack : (childrenPros[step || activeStep]? childrenPros[step || activeStep].handleBack : this.handleBack)} >
                                <KeyboardArrowLeft/>
                                { ((step || activeStep) === 0)? initialBackTitle || 'Atras' : 'Atras'}
                            </Button>
                        </div>
                    }
                />
            </div>
        )
    }
}



export default withStyles(styles)(MyMobileStepper)