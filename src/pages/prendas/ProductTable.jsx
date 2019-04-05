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
import { Edit, Delete, Close } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox'
import classNames from 'classnames'


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
    width: '100%'
  }
})

let Panel = ({ classes, children, isDeletable, isEditing, toggleEditing}) => (
  <Paper className={classes.root}>
    <div className={classes.container}>
      <div className={classes.info}>
        <Typography color="inherit" component="h6" variant="h4" >Linea Latex</Typography>
        <Typography color="inherit" component="span" variant="overline">57 Prendas</Typography>
      </div>
      <div className={classes.actions}> 
        {
          isDeletable &&
          <IconButton color="inherit">
            <Delete />
          </IconButton>
        }
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
    minWidth: 1000,
    padding: `20px 0`
  },
});



class ProductTable extends React.Component {

  state = {
    values: {},
    isEditing: false
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

  oneSelected =()=>{
    const { values } = this.state
    const valuesList = Object.keys(values).map(id => values[id])
    if(valuesList.length){
      return valuesList.find(value => value) || false
    }
    return false
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

  toggleEditing = () => {
      this.setState(({isEditing}) =>({
        isEditing: !isEditing
      }))
  }

  allSelected = ()=>{
    const { values } = this.state
    const { data } = this.props
    const valuesList = Object.keys(values).map(id => values[id])
    if(!(data.length === valuesList.length)){
        return false
    }
    return valuesList.reduce((prev, currentValue)=>{
      return (prev && currentValue)
    }) 
  }  

  render() {
    const { classes, data } = this.props;
    const { values, isEditing } = this.state
    const isDeletable = this.oneSelected()
    const isAllSelected = this.allSelected()
    return (
      <Panel isEditing={isEditing} toggleEditing={this.toggleEditing} isDeletable={isDeletable} >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {
                isEditing &&
                <TableCell padding="checkbox">
                  <Checkbox
                    onChange={this.onCheckAll}
                    checked={isAllSelected}
                  />
                </TableCell>
              }
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Referencia</TableCell>
              <TableCell align="right">Valor(COP)</TableCell>
              <TableCell align="right">Valor(USD)</TableCell>
              {
                isEditing &&
                <TableCell align="right">Editar</TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow selected={this.state.values[row.id]} hover key={row.id}>
                {
                  isEditing &&
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={values[row.id] || false}
                      onChange={this.handleChange(row.id)}
                    />
                  </TableCell>
                }
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.reference}</TableCell>
                <TableCell align="right">{row.cop}</TableCell>
                <TableCell align="right">{row.usd}</TableCell>
                {
                  isEditing &&
                  <TableCell align="right">
                    <IconButton>
                        <Edit fontSize="small"/>
                    </IconButton>
                  </TableCell>
                }
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