import React from 'react'
import { connect } from 'react-redux'
import { showAlert, hideAlert } from '../../actions'
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from './MySnackbarContentWrapper'


class Alert extends React.Component {


    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.props.hideAlert();
    }
    render() {
        const { type, message, show } = this.props;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={show}
                autoHideDuration={5000}
                onClose={this.handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={this.handleClose}
                    variant={type}
                    message={message}
                />
            </Snackbar>
        )
    }
}

const mapDispatchToProps = {
    showAlert,
    hideAlert
}

function mapStateToProps(state) {
    return {
        type: state.alert.type,
        show: state.alert.show,
        message: state.alert.message
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Alert);