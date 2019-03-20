import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import ClientDetailInfo from './ClientDetailInfo';


const styles = theme => ({
   
})

class ClientDetail extends Component {
    render() {
        const id = this.props.match.params.id
        const { classes } = this.props
        return (
            <div>
                <Typography className={classes.title} component="h2" variant="h3">Fabian David Dueñas {id}</Typography>
                
                <ClientDetailInfo />
            </div>
        )
    }
}


export default withStyles(styles)(ClientDetail);