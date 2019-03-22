import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import ClientDetailInfo from './ClientDetailInfo';
import {  connect } from 'react-redux'
import { showBackButtom, hideBackButtom } from '../../actions'


const styles = theme => ({
   title:{
        marginBottom: `${theme.spacing.unit * 3}px`,
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
        const id = this.props.match.params.id
        const { classes } = this.props
        return (
            <div>
                <Typography className={classes.title} component="h2" variant="h2">Fabian David Dueñas {id}</Typography>
                
                <ClientDetailInfo />
            </div>
        )
    }
}

const mapDispatchToProps = {
    showBackButtom,
    hideBackButtom
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(ClientDetail));