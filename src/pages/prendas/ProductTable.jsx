import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Edit, Delete } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox'


const panelStyles = theme => ({
  root: {
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

  }
})

let Panel = ({ classes, children }) => (
  <Paper className={classes.root}>
    <div className={classes.container}>
      <div className={classes.info}>
        <Typography color="inherit" component="h6" variant="h4" >Linea Latex</Typography>
        <Typography color="inherit" component="span" variant="overline">57 Prendas</Typography>
      </div>
      <div className={classes.actions}>
        <IconButton color="inherit">
          <Edit />
        </IconButton>
      </div>
    </div>
    <div>
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
    //minWidth: 700,
    padding: `20px 0`
  },
});



class ProductTable extends React.Component {

  state = {
    values: {},
    checkAll: false,

  }

  handleChange = (id) => (event) => {
    //event.persist()
    const check = event.target.checked
    this.setState(state => ({
      checkAll: false,
      values: {
        ...state.values,
        [id]: check,
      }
    }))
  }

  onCheckAll = (event) => {
    const values = {}
    const check = event.target.checked
    const { data } =  this.props

    data.forEach(row => {
      values[row.id] = check
    })
    this.setState(state => ({
        checkAll: check,
        values
    }))
  }


  render() {
    const { classes, data } = this.props;
    return (
      <Panel >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={this.onCheckAll}
                  checked={this.state.checkAll}
                />
              </TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Referencia</TableCell>
              <TableCell align="right">Valor(COP)</TableCell>
              <TableCell align="right">Valor(USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow selected={this.state.values[row.id]} hover key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={this.state.values[row.id] || false}
                    onChange={this.handleChange(row.id)}
                  />
                </TableCell>
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