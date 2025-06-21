import React, { Component } from 'react'
import ListClientItem from './ListClientsItem'

class ClientList extends Component{
    
    state = {
        expanded: null,
        sortClients: []
    }

    handleChange = panel => (evento, expanded) => {
        this.setState({ expanded: expanded? panel : null });
    }
    
    componentDidMount(){
        const {clients} = this.props

        const sortClients =  clients.sort((a,b)=>{
            if(a.name.toLowerCase().trim() > b.name.toLowerCase().trim()) return 1
            if(a.name.toLowerCase().trim() < b.name.toLowerCase().trim()) return -1
            return 0
        })
        console.log("Datos:",sortClients)
        this.setState({
            sortClients
        })
    }
    
    render(){
        const { handleAddOrder } = this.props
        const { expanded, sortClients } = this.state

        return(
        <div style={{marginTop: '0'}}>
        {
            sortClients.map((client, index) =>(
                <ListClientItem
                    handleAddOrder={handleAddOrder(client.id)}
                    handleClickVerMas={this.props.handleClickVerMas(client.id)}
                    key={index}
                    client={client} 
                    expanded={ expanded === index } 
                    handleChange={ this.handleChange(index) } />
            ))
        }      
        </div>
        )
    }
}

export default ClientList;