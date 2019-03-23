import React, {  Component } from "react";
import MyStep from '../../../componets/mystepper/MyStep'
import MyStepper from '../../../componets/mystepper/MyStepper'
class NewClient extends Component{
    render(){
        return(
            <div>
                <MyStepper>
                    <MyStep title="Prueba 1" >
                        Hola desde Prueba 1
                    </MyStep>
                    <MyStep title="Prueba 2" >
                        Hola desde Prueba 1
                    </MyStep>
                    <MyStep title="Prueba 3" >
                        Hola desde Prueba 1
                    </MyStep>
                </MyStepper>
            </div>
        )
    }
}


export default NewClient;