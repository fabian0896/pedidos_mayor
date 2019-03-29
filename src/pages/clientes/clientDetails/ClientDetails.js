import React, { Component, Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import ClientDetailInfo from './ClientDetailInfo';
import {  connect } from 'react-redux'
import { showBackButtom, hideBackButtom } from '../../../actions'
import ClientDetailHeader from './ClientDetailHeader';
import { getClientById } from '../../../lib/firebaseService'


const styles = theme => ({

   content:{
       position: 'relative',
       zIndex: 3,
       marginTop: '-80px'
   }
})

class ClientDetail extends Component {

    state = {
        loading: true,
        client: null
    }

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.showBackButtom()
        getClientById(id, (err, client)=>{
            if(err){
                console.log(err)
                return;
            }
            this.setState({loading: false, client})
        })
    }

    componentWillUnmount(){
        this.props.hideBackButtom()
    }

    render() {
        const { classes } = this.props
        const { loading, client } = this.state
        return (
            <div>
                {
                    (!client && !loading) &&
                    <div>
                        El Cliente no existe :(
                    </div>
                }
                {
                    (client && !loading) &&
                    <Fragment>
                        <ClientDetailHeader client={client} />
                        <div className={classes.content}>
                            <ClientDetailInfo client={client} />
                        </div>
                    </Fragment>
                }
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