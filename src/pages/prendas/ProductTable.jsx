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










let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
  createData('Faja Latex Clasica 4 Hileras', '1934-4', '$34.000', '$24'),
];











const panelStyles = theme =>({
    root:{
      overflow: 'hidden',
      padding: `0 ${theme.spacing.unit * 0}px ${theme.spacing.unit * 6}px`,
      marginBottom: `${theme.spacing.unit *2}px`
    },
    container:{
        padding: `20px ${theme.spacing.unit * 3}px`,
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText
    }
})

let Panel = ({classes, children}) =>(
  <Paper className={classes.root}>
          <div className={classes.container}>
            <Typography color="inherit" component="h6" variant="h4" >Linea Latex</Typography>
            <Typography color="inherit" component="span" variant="overline">57 Prendas</Typography>
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
  },
});



function ProductTable(props) {
  const { classes } = props;
  return (
    <Panel >
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Referencia</TableCell>
            <TableCell align="right">Valor(COP)</TableCell>
            <TableCell align="right">Valor(USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Panel>
  );
}

ProductTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductTable);