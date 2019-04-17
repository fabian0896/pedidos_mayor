import React, {Component} from 'react'
import { withStyles, Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';









const styles = theme =>({
    root:{
        overflow: 'hidden',
        marginBottom: theme.spacing.unit*2
    },
    header:{
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText,
        padding: `${theme.spacing.unit*3}px ${theme.spacing.unit*3}px`,
        marginBottom: theme.spacing.unit*3
    },
    tableContainer:{
        overflowX: 'auto',
        position: 'realtive'
    },
    table:{
        minWidth: 650
    },
    tableTotal:{
        background: theme.palette.grey[100]
    },
    totalRow:{
        background: theme.palette.grey[300]
    }
})




class OrderProductTable extends Component{
    render(){
        const { classes } = this.props
        return(
            <Paper className={classes.root}>
                <div className={classes.header}>
                    <Typography color="inherit" variant="h4">Prendas</Typography>
                </div>
                <div className={classes.tableContainer}>
                    <Table padding="dense" className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Referencia</TableCell>
                                <TableCell>Talla</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>valor</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow hover>
                                <TableCell>Faja Latex Clasica 3 Hileras</TableCell>
                                <TableCell>1934-3</TableCell>
                                <TableCell>32</TableCell>
                                <TableCell>Negro</TableCell>
                                <TableCell>20</TableCell>
                                <TableCell>$10</TableCell>
                                <TableCell>$200</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell>Faja Latex Clasica 3 Hileras</TableCell>
                                <TableCell>1934-3</TableCell>
                                <TableCell>32</TableCell>
                                <TableCell>Negro</TableCell>
                                <TableCell>20</TableCell>
                                <TableCell>$10</TableCell>
                                <TableCell>$200</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell>Faja Latex Clasica 3 Hileras</TableCell>
                                <TableCell>1934-3</TableCell>
                                <TableCell>32</TableCell>
                                <TableCell>Negro</TableCell>
                                <TableCell>20</TableCell>
                                <TableCell>$10</TableCell>
                                <TableCell>$200</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell>Faja Latex Clasica 3 Hileras</TableCell>
                                <TableCell>1934-3</TableCell>
                                <TableCell>32</TableCell>
                                <TableCell>Negro</TableCell>
                                <TableCell>20</TableCell>
                                <TableCell>$10</TableCell>
                                <TableCell>$200</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell>Faja Latex Clasica 3 Hileras</TableCell>
                                <TableCell>1934-3</TableCell>
                                <TableCell>32</TableCell>
                                <TableCell>Negro</TableCell>
                                <TableCell>20</TableCell>
                                <TableCell>$10</TableCell>
                                <TableCell>$200</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell>Faja Latex Clasica 3 Hileras</TableCell>
                                <TableCell>1934-3</TableCell>
                                <TableCell>32</TableCell>
                                <TableCell>Negro</TableCell>
                                <TableCell>20</TableCell>
                                <TableCell>$10</TableCell>
                                <TableCell>$200</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell>Faja Latex Clasica 3 Hileras</TableCell>
                                <TableCell>1934-3</TableCell>
                                <TableCell>32</TableCell>
                                <TableCell>Negro</TableCell>
                                <TableCell>20</TableCell>
                                <TableCell>$10</TableCell>
                                <TableCell>$200</TableCell>
                            </TableRow>


                            <TableRow className={classes.tableTotal}>
                                <TableCell colSpan={3}>
                                    <Typography variant="subtitle2">Sub Total</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">$1.000</Typography>
                                </TableCell>
                                <TableCell colSpan={3}></TableCell>
                            </TableRow>
                            <TableRow className={classes.tableTotal}>
                                <TableCell colSpan={2}>
                                    <Typography variant="subtitle2">Descuento</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">15%</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">$1.000</Typography>
                                </TableCell>
                                <TableCell colSpan={3}></TableCell>
                            </TableRow>
                            <TableRow className={classes.totalRow}>
                                <TableCell colSpan={3}>
                                    <Typography variant="subtitle2">Total</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">$1.000</Typography>
                                </TableCell>
                                <TableCell colSpan={3}></TableCell>
                            </TableRow>
                            
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        )
    }
}




export default withStyles(styles)(OrderProductTable)