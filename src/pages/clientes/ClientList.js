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
        const { clients } = this.props
        const { expanded } = this.state

        return(
        <div style={{marginTop: '20px'}}>
        {
            clients.map((client, index) =>(
                <ListClientItem
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