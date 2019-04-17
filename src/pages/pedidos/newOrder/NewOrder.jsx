import React, { Component } from 'react'
import HeaderLayout from '../../../componets/headerLayout/HeaderLayout';
import { Typography } from '@material-ui/core';
import MyStepper from '../../../componets/mystepper/MyStepper';
import MyStep from '../../../componets/mystepper/MyStep';
import ClientForm from './ClientForm';
import { connect } from 'react-redux'
import { showBackButtom, hideBackButtom } from '../../../actions'




class NewOrder extends Component{

    componentDidMount(){
        this.props.showBackButtom()
    }

    componentWillUnmount(){
        this.props.hideBackButtom()
    }


    render(){
        const { clientsList } = this.props
        return(
            <div>
                <HeaderLayout>
                    <Typography component="h2" variant="h2" color="inherit">Nuevo Pedido</Typography>
                </HeaderLayout>
                <MyStepper>
                    <MyStep title="Clinete">
                        <ClientForm options={clientsList}/>
                    </MyStep>
                    <MyStep title="Envio">

                    </MyStep>
                    <MyStep title="Prendas">

                    </MyStep>
                    <MyStep title="Cobro">

                    </MyStep>
                    <MyStep title="Resumen">

                    </MyStep>
                </MyStepper>
            </div>
        )
    }
}

const mapDispatchToProps ={
    showBackButtom,
    hideBackButtom
}

function mapStateToProps(state, props){
    
    const clients = state.clients.all
    const clientsList = Object.keys(clients).map(id =>{
        return{
            label: clients[id].name,
            value: clients[id].id
        }
    })

    return{
        clientsList,
        clients
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (NewOrder)