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

        const { expanded } = this.state

        return(
            <div style={{marginTop: '20px'}}>
            <ListClientItem 
                expanded={ expanded === 'panel1' } 
                handleChange={ this.handleChange('panel1') } />
            <ListClientItem 
                expanded={ expanded === 'panel2' } 
                handleChange={ this.handleChange('panel2') } />
            <ListClientItem 
                expanded={ expanded === 'panel3' } 
                handleChange={ this.handleChange('panel3') } />
            <ListClientItem 
                expanded={ expanded === 'panel4' } 
                handleChange={ this.handleChange('panel4') } />
            <ListClientItem 
                expanded={ expanded === 'panel5' } 
                handleChange={ this.handleChange('panel5') } />
        </div>
        )
    }
}

export default ClientList;