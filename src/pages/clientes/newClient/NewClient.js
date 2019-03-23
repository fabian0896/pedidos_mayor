import React, {  Component } from "react";
import MyStep from '../../../componets/mystepper/MyStep'
import MyStepper from '../../../componets/mystepper/MyStepper'
class NewClient extends Component{
    
    handleComplete = () =>{
        console.log("Se completo el esteper")
    }
    
    render(){
        return(
            <div>
                <MyStepper onComplete={this.handleComplete}>
                    <MyStep title="Informacion Basica" >
                        Hola desde prueba 1
                    </MyStep>
                    <MyStep title="Contacto" >
                        Hola desde prueba 2
                    </MyStep>
                    <MyStep title="Extra" >
                        Hola desde prueba 3
                    </MyStep>
                </MyStepper>
            </div>
        )
    }
}


export default NewClient;