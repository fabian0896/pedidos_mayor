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
import {formatProductForTable} from '../../../lib/utilities'










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
    },
    tableCell:{
        width: 400
    },
    colors:{
        color: 'red'
    }
})





const MoneyCel = ({amount, colSpan})=>(
    <NumberFormat 
        value={amount} 
        displayType={'text'} 
        thousandSeparator={true} 
        prefix={'$'} 
        renderText={value => (
            <TableCell colSpan={colSpan}>
                <Typography variant="subtitle2">{value}</Typography>
            </TableCell>)} />
)


class OrderProductTable extends Component{
    
    getTotal(data){   
        if(!data.length) return 0
        const total = data.map(({price, quantity})=>(parseFloat(price)*parseInt(quantity)))
            .reduce((prev, current)=> prev + current)
        return total.toFixed(2)
    }

    getTotalQuantity(data=[]){
        return data.reduce((prev, curr)=>{
            return prev + parseInt(curr.quantity) 
        }, 0)
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
            order,
            ...rest
         } = this.props


         //console.log(formatProductForTable(data))
         //console.log(data)
         const [formatData, sizeList] = formatProductForTable(data)

        return(
            <Paper {...rest} className={classes.root}>
                <div className={classes.header}>
                    <Typography color="inherit" variant="h4">Prendas ({order? order.totalProducts : this.getTotalQuantity(data)})</Typography>
                </div>
                <div className={classes.tableContainer}>
                    <Table size="small" padding="checkbox" className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {
                                    withEdittingButtons &&
                                    <TableCell>Editar/Eliminar</TableCell>
                                }
                                <TableCell className={classes.tableCell} size="medium" padding="checkbox" >Nombre</TableCell>
                                <TableCell>Referencia</TableCell>
                                <TableCell>Marquilla</TableCell>
                                <TableCell>Molde</TableCell>
                                <TableCell align="center">Color</TableCell>
                                {
                                    sizeList.map((size, index)=> <TableCell align="center" key={index}>{size}</TableCell>)
                                }

                                <TableCell>{`Valor(${currency})`}</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>{`Total(${currency})`}</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                formatData.map((product, index)=>{
                                    return(
                                        <TableRow key={index} hover>
                                            {
                                                withEdittingButtons &&
                                                <TableCell padding="checkbox">
                                                    <IconButton onClick={handleEdit(product)} >
                                                        <EditIcon fontFamily="small" />
                                                    </IconButton>
                                                    <IconButton onClick={handleDelete(product)}>
                                                        <DeleteIcon color="error" fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            }
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.reference}</TableCell>
                                            <TableCell>{product.label === 'generic'? 'Generica': product.labelName}</TableCell>
                                            <TableCell>{product.mold === 'new'? 'Nuevo':'Viejo'}</TableCell>
                                            <TableCell align="center" style={{color: product.colorHex, fontWeight: 500}} >{product.color}</TableCell>
                                            
                                            {
                                                product.sizesList.map((size, index)=>{
                                                   return <TableCell align="center" key={index}>{size > 0 ? size: "-"}</TableCell>
                                                })
                                            }
                                            
                                            <NumberFormat 
                                                value={product.price} 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                prefix={'$'} 
                                                renderText={value => <TableCell>{value}</TableCell>} />
                                            
                                            <TableCell align="center">{product.quantity}</TableCell>
                                            
                                            <NumberFormat 
                                                value={(product.quantity * product.price).toFixed(1)} 
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
                                        <TableCell colSpan={(withEdittingButtons? 6 : 5) + sizeList.length -1 }></TableCell>
                                        <TableCell colSpan={3 }>
                                            <Typography variant="subtitle2">Sub Total</Typography>
                                        </TableCell>
                                        <MoneyCel amount={parseFloat(order.subTotal).toFixed(1)}/>
                                    </TableRow>
                                    
                                    <TableRow className={classes.tableTotal}>
                                        <TableCell colSpan={(withEdittingButtons? 6 : 5) + sizeList.length - 1 }></TableCell>
                                        <TableCell colSpan={2 }>
                                            <Typography variant="subtitle2">Descuento</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2">{`${order.descount}%`}</Typography>
                                        </TableCell>
                                        <MoneyCel amount={-(order.subTotal*(order.descount/100)).toFixed(1)}/>
                                    </TableRow>
                                </Fragment>
                            } 
                            {
                                withTotal &&
                                <TableRow className={classes.totalRow}>
                                    <TableCell colSpan={(withEdittingButtons? 6 : 5) + sizeList.length - 1 }></TableCell>
                                    <TableCell colSpan={3 }>
                                        <Typography variant="subtitle2">Total</Typography>
                                    </TableCell>
                                    <NumberFormat 
                                                value={withDetails? order.total : this.getTotal(data)} 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                prefix={`${currency==='COP'?'':currency+' '}$`} 
                                                renderText={value =>( 
                                                    <TableCell>
                                                        <Typography variant="subtitle2">{value}</Typography>
                                                    </TableCell>
                                                )} />
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