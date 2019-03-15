import React from 'react'
import './Alert.css'
import { connect } from 'react-redux'
import { showAlert, hideAlert } from '../../actions'


class Alert extends React.Component{
    
    state = {
        show: true
    }
    
    handleShow = () =>{
        this.setState({show: false})
    }
    render(){
        const { type, message, show } = this.props;
        
        let temporizador;
        if(show){
            temporizador = setTimeout(()=>{ this.props.hideAlert() }, 3000)
        } else {
            clearTimeout(temporizador);
        }

        return(
        <div className={`${show? 'AlertIn' : 'AlertOut'} alert alert-${type} alert-dismissible fade show` }role="alert">
            {message}
            <button onClick={this.props.hideAlert} type="button" className="close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        )
    }
}

const mapDispatchToProps = {
    showAlert,
    hideAlert
}

function mapStateToProps(state){
    return {
        type: state.alert.type,
        show: state.alert.show,
        message: state.alert.message
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Alert);