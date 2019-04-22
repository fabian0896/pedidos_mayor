import React, {Component, Fragment} from 'react'
import { 
    withStyles, 
    Paper, 
    Typography, 
    Table, 
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell, 
    IconButton } from '@material-ui/core';
import {
    Delete as DeleteIcon,
    Edit as EditIcon
 } from '@material-ui/icons'
import NumberFormat from 'react-number-format';









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
    
    getTotal(data){   
        if(!data.length) return 0
        const total = data.map(({price, quantity})=>(parseFloat(price)*parseInt(quantity)))
            .reduce((prev, current)=> prev + current)
        return total
    }
    
    render(){
        const { 
            classes, 
            data, 
            withDetails, 
            withEdittingButtons, 
            handleDelete, 
            handleEdit,
            withTotal,
            currency,
            ...rest
         } = this.props
        return(
            <Paper {...rest} className={classes.root}>
                <div className={classes.header}>
                    <Typography color="inherit" variant="h4">Prendas</Typography>
                </div>
                <div className={classes.tableContainer}>
                    <Table padding="dense" className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {
                                    withEdittingButtons &&
                                    <TableCell>Editar/Eliminar</TableCell>
                                }
                                <TableCell>Nombre</TableCell>
                                <TableCell>Referencia</TableCell>
                                <TableCell>Talla</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>{`Valor(${currency})`}</TableCell>
                                <TableCell>{`Total(${currency})`}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((product, index)=>{
                                    return(
                                        <TableRow key={index} hover>
                                            {
                                                withEdittingButtons &&
                                                <TableCell padding="checkbox">
                                                    <IconButton onClick={handleEdit(index)} >
                                                        <EditIcon fontFamily="small" />
                                                    </IconButton>
                                                    <IconButton onClick={handleDelete(index)}>
                                                        <DeleteIcon color="error" fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            }
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.reference}</TableCell>
                                            <TableCell>{product.size}</TableCell>
                                            <TableCell>{product.color}</TableCell>
                                            <TableCell>{product.quantity}</TableCell>
                                            <NumberFormat 
                                                value={product.price} 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                prefix={'$'} 
                                                renderText={value => <TableCell>{value}</TableCell>} />
                                            <NumberFormat 
                                                value={product.quantity * product.price} 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                prefix={'$'} 
                                                renderText={value => <TableCell>{value}</TableCell>} />
                                        </TableRow>
                                    )
                                })
                            }
                            {
                                withDetails &&
                                <Fragment>

                                    <TableRow className={classes.tableTotal}>
                                        <TableCell colSpan={3}>
                                            <Typography variant="subtitle2">Sub Total</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2">$1.000</Typography>
                                        </TableCell>
                                        <TableCell colSpan={withEdittingButtons? 4 : 3}></TableCell>
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
                                        <TableCell colSpan={withEdittingButtons? 4 : 3}></TableCell>
                                    </TableRow>
                                </Fragment>
                            } 
                            {
                                withTotal &&
                                <TableRow className={classes.totalRow}>
                                    <TableCell colSpan={3}>
                                        <Typography variant="subtitle2">Total</Typography>
                                    </TableCell>
                                    <NumberFormat 
                                                value={this.getTotal(data)} 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                prefix={`${currency} $`} 
                                                renderText={value =>( 
                                                    <TableCell>
                                                        <Typography variant="subtitle2">{value}</Typography>
                                                    </TableCell>
                                                )} />
                                    <TableCell colSpan={withEdittingButtons? 4 : 3}></TableCell>
                                </TableRow>
                            } 
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        )
    }
}




export default withStyles(styles)(OrderProductTable)