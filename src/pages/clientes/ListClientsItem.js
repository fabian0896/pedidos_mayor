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


const styles = theme => ({
    container:{
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
      },
     statsContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
     },
     stats:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
     }

})



class ListClientesItem extends Component{
     
    render(){
        const { classes, expanded, handleChange } = this.props
        
        return(
                <ExpansionPanel expanded={ expanded } onChange={ handleChange }>
                    <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon /> }>
                        <div className={ classes.container }>
                            <Avatar>FB</Avatar>
                            <div className={ classNames(classes.container, classes.row) }>
                                <Typography variant="h6">Fabian David Dueñas</Typography>
                                <Typography component="span" variant="subheading" color="textSecondary">Ultimo pedido: hace 2 dias</Typography>
                            </div>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className={ classes.statsContainer }>
                            <div className={ classes.stats }>
                                <Typography component="span" variant="subheading" color="textSecondary">Saldo Pendiente</Typography>
                                <Typography component="span" variant="headline" color="textPrimary">$1.000.000</Typography>
                            </div>
                            <div className={ classNames(classes.helper, classes.stats) }>
                                <Typography component="span" variant="subheading" color="textSecondary">Ultimo pago</Typography>
                                <Typography component="span" variant="headline" color="textPrimary">5 de Febrero 2018</Typography>
                            </div>
                            <div className={ classNames(classes.helper, classes.stats) }>
                                <Typography component="span" variant="subheading" color="textSecondary">Total de pedidos</Typography>
                                <Typography component="span" variant="headline" color="textPrimary">35</Typography>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        <Button size="small" color="secondary">ver mas</Button>
                        <Button size="small" color="primary">Agregar pedido</Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
        )
    }
}



export default withStyles(styles)(ListClientesItem);