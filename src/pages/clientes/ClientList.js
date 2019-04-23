import React, { Component } from 'react'
import ListClientItem from './ListClientsItem'

class ClientList extends Component{
    
    state = {
        expanded: null
    }

    handleChange = panel => (evento, expanded) => {
        this.setState({ expanded: expanded? panel : null });
    }
    
    
    render(){
        const { clients, handleAddOrder } = this.props
        const { expanded } = this.state

        return(
        <div style={{marginTop: '0'}}>
        {
            clients.map((client, index) =>(
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