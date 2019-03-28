import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import ClientDetailInfo from './ClientDetailInfo';
import {  connect } from 'react-redux'
import { showBackButtom, hideBackButtom } from '../../../actions'
import ClientDetailHeader from './ClientDetailHeader';


const styles = theme => ({

   content:{
       position: 'relative',
       zIndex: 3,
       marginTop: '-80px'
   }
})

class ClientDetail extends Component {

    componentDidMount(){
        this.props.showBackButtom()
    }

    componentWillUnmount(){
        this.props.hideBackButtom()
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <ClientDetailHeader />
                <div className={classes.content}>
                    <ClientDetailInfo />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    showBackButtom,
    hideBackButtom
}

function mapStateToProps(state, props){
    return{
        
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(ClientDetail));