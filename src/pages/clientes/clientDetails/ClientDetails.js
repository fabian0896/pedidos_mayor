import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import ClientDetailInfo from './ClientDetailInfo';
import {  connect } from 'react-redux'
import { showBackButtom, hideBackButtom } from '../../../actions'


const styles = theme => ({
   title:{
        marginBottom: `${theme.spacing.unit * 3}px`,
   },
   header:{
       display: 'flex'
   },
   img:{
        height: '50px',
        borderRadius: '5px',
        boxShadow: theme.shadows[2],
        marginLeft: `${theme.spacing.unit*2}px`,
        alignItems: 'center'
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
                <div className={classes.header}>
                    <Typography className={classes.title} component="h2" variant="h3">Fabian David Dueñas</Typography>
                    <img className={classes.img} src={"https://restcountries.eu/data/mex.svg"}/>
                </div>
                
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