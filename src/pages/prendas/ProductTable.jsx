import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Edit, Delete, Close } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox'
import classNames from 'classnames'
import { Icon } from '@material-ui/core';


const panelStyles = theme => ({
  root: {
    width: '100%',
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 0}px ${theme.spacing.unit * 6}px`,
    marginBottom: `${theme.spacing.unit * 2}px`,
  },
  container: {
    padding: `20px ${theme.spacing.unit * 3}px`,
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center'
  },
  info: {
    flex: 1
  },
  actions: {

  },
  tableContent:{
    overflowX: 'auto',
    //width: '100%'
    position: 'relative'
  }
})

let Panel = ({ classes, children, isEditing, toggleEditing}) => (
  <Paper className={classes.root}>
    <div className={classes.container}>
      <div className={classes.info}>
        <Typography color="inherit" component="h6" variant="h4" >Linea Latex</Typography>
        <Typography color="inherit" component="span" variant="overline">57 Prendas</Typography>
      </div>
      <div className={classes.actions}> 
        <IconButton onClick={toggleEditing} color="inherit">
          {
            isEditing?
            <Close />
            :
            <Edit />
          }
        </IconButton>
      </div>
    </div>
    <div className={classes.tableContent}>
      {children}
    </div>
  </Paper>
)

Panel = withStyles(panelStyles)(Panel)



const styles = theme => ({
  root: {
    width: '100%',
    //marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    //minWidth: 500,
    padding: `20px 0`
  },
  deletButton:{
    color: theme.palette.error.main
  }
});



class ProductTable extends React.Component {

  state = {
    isEditing: false
  }

  toggleEditing = () => {
      this.setState(({isEditing}) =>({
        isEditing: !isEditing
      }))
  }


  render() {
    const { classes, data } = this.props;
    const { isEditing } = this.state
    let minWidth = 500
    if(isEditing) minWidth = 600

    return (
      <Panel isEditing={isEditing} toggleEditing={this.toggleEditing} >
        <Table style={{minWidth}} padding="dense" className={classes.table}>
          <TableHead>
            <TableRow>
              {
                isEditing &&
                <TableCell align="left">Eliminar/Editar</TableCell>
              }
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Referencia</TableCell>
              <TableCell align="right">Valor(COP)</TableCell>
              <TableCell align="right">Valor(USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow hover key={row.id}>
                {
                  isEditing &&
                  <TableCell padding="checkbox" align="left">
                    <div>
                      <IconButton className={classes.deletButton} color="inherit">
                          <Delete fontSize="small"/>
                      </IconButton>
                      <IconButton>
                          <Edit fontSize="small"/>
                      </IconButton>
                    </div>
                    </TableCell>
                }
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.reference}</TableCell>
                <TableCell align="right">{row.cop}</TableCell>
                <TableCell align="right">{row.usd}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    )

  }
}

ProductTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductTable);