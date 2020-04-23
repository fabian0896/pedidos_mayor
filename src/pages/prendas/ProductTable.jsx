import React, {Fragment} from 'react';
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
import { capitalize } from '../../lib/utilities' 
import NumberFormat from 'react-number-format';
import { Tooltip, Chip } from '@material-ui/core'


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

let Panel = ({ classes, children, isEditing, toggleEditing, name, count}) => (
  <Paper className={classes.root}>
    <div className={classes.container}>
      <div className={classes.info}>
        <Typography color="inherit" component="h6" variant="h4" >Linea {capitalize(name)}</Typography>
        <Typography color="inherit" component="span" variant="overline">{count} Prendas</Typography>
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


const CustomChip = withStyles(theme=>({
  root:{
    color: '#FFFFFF',
    background: '#d3d3d3',
    padding: 2,
    borderRadius: 3,
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: 900,
    marginRight: theme.spacing.unit*3
  }
}))(({value, classes})=>{
  return(
    <Fragment>
      {
        !!value &&
        <span className={classes.root}>
            en
        </span>
      }
    </Fragment>
  )
})


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
    const { classes, data, name, count, handleEdit, handleDelete } = this.props;
    const { isEditing } = this.state
    let minWidth = 500
    if(isEditing) minWidth = 600

    return (
      <Panel count={count} name={name} isEditing={isEditing} toggleEditing={this.toggleEditing} >
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
                      <IconButton onClick={handleDelete(row.id)} className={classes.deletButton} color="inherit">
                          <Delete fontSize="small"/>
                      </IconButton>
                      <IconButton onClick={handleEdit(row.id)}>
                          <Edit fontSize="small"/>
                      </IconButton>
                    </div>
                    </TableCell>
                }
                <Tooltip title={row.name_en || ''}>
                  <TableCell component="th" scope="row">
                    {row.name} <CustomChip value={row.name_en}/>
                  </TableCell>
                </Tooltip>
                <TableCell align="right">{row.reference}</TableCell>
                <NumberFormat value={row.cop} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <TableCell align="right">{value}</TableCell>} />
                <NumberFormat value={row.usd} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <TableCell align="right">{value}</TableCell>} />
                {/* <TableCell align="right">{row.cop}</TableCell> */}
                {/* <TableCell align="right">{row.usd}</TableCell> */}
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