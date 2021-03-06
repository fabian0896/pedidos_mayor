import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar'
import classNames from 'classnames'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Button from '@material-ui/core/Button';
import { getNameLetters } from '../../lib/utilities'
import NumberFormat from 'react-number-format';
import moment from 'moment'

const styles = theme => ({
    infoContainer:{
        display: 'flex',
        justifyContent: 'center',
    },
    mainContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row:{
        flexDirection: 'column',
        marginLeft: 20
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        [theme.breakpoints.down('xs')]:{
            borderLeft: 'none',
            padding: 0     
        }

      },
     statsContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        [theme.breakpoints.down('xs')]:{
            flexDirection: 'column',
            height: '250px',
            //justifyContent: 'space-between',
            alignItems: 'start'   
        }
     },
     stats:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]:{
            //flexDirection: 'column',
            flex: 1,
            alignItems: 'start',
            height: 'auto',
            width: 'auto'
        }
        
     },
     avatar: {
         //height: '56px',
         //width: '56px',
         background: `rgb(200,200,200)`
     },
})



class ListClientesItem extends Component{
     
    render(){
        const { classes, expanded, handleChange, client } = this.props
        const date = client.lastPayment? moment(client.lastPayment.seconds*1000).format('DD/MM/YYYY') : '---'
        return(
                <ExpansionPanel expanded={ expanded } onChange={ handleChange }>
                    <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon /> }>
                        <div className={ classes.mainContainer }>
                            <Avatar 
                                className={classes.avatar} 
                                style={{background: `rgb(${client.personalColor.join(',')})`}} >
                                {getNameLetters(client.name)}
                            </Avatar>
                            <div className={ classNames(classes.infoContainer, classes.row) }>
                                <Typography variant="h6">{ client.name }</Typography>
                                <Typography component="span" variant="subheading" color="textSecondary">{client.city}, {client.country.translations.es}</Typography>
                            </div>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className={ classes.statsContainer }>
                            <div className={ classes.stats }>
                                <Typography inline component="span" variant="subheading" color="textSecondary">Saldo Pendiente:</Typography>
                                <NumberFormat 
                                    value={parseFloat(client.balance).toFixed(1)} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    prefix={`${client.currency==='COP'? '' : client.currency} $`} 
                                    renderText={value =>( 
                                        <Typography inline  component="span" variant="headline" color="textPrimary">{value}</Typography>
                                    )} />
                            </div>
                            <div className={ classNames(classes.helper, classes.stats) }>
                                <Typography inline component="span" variant="subheading" color="textSecondary">Ultimo pago:</Typography>
                                <Typography inline  component="span" variant="headline" color="textPrimary">{date}</Typography>
                            </div>
                            <div className={ classNames(classes.helper, classes.stats) }>
                                <Typography inline component="span" variant="subheading" color="textSecondary">Total de pedidos:</Typography>
                                <Typography inline component="span" variant="headline" color="textPrimary">{client.totalOrders || 0}</Typography>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        <Button onClick={this.props.handleClickVerMas} size="small" color="secondary">ver mas</Button>
                        <Button onClick={this.props.handleAddOrder} size="small" color="primary">Agregar pedido</Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
        )
    }
}



export default withStyles(styles)(ListClientesItem);