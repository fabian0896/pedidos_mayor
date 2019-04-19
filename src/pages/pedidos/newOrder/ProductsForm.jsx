import React from 'react';
import { Formik, Field } from 'formik'
import { selectSearch } from '../../../lib/searchService'
import MyAsyncAutomoplete from '../../../componets/myAutocomplete/MyAsyncAutocomplete'
import { withStyles, Grid, TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';




function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        thousandSeparator
        prefix="$"
      />
    );
  }


const styles = theme =>({
    input:{

    },
    form:{
        width: 450,
        padding: theme.spacing.unit*2
    }
})

class ProductForm extends React.Component{

    state={
        labelText: '',
        productId: ''
    }

    myCustomHandleChange = (handleChange)=>(event)=>{
        handleChange(event)
        const { productId } = this.state
        const { customPrices } = this.props
        const actualProduct = customPrices[productId]
        if(actualProduct){
            if(actualProduct.cop === parseInt(event.target.value)){
                this.setState({labelText: 'Precio personalizado'})
                return
            }
        }
        this.setState({labelText: ''})
    }

    handleProductChange = (setValues)=> (option) => {
        const { allProducts, customPrices } = this.props
        let price = ""
        if(option){
            const id = option.value
            if(customPrices[id]){
                price = customPrices[id].cop
                this.setState({labelText: 'Precio personalizado', productId: id})
            }else{
                const { cop } = allProducts[id]
                price = cop
                this.setState({labelText: '', productId: ''})
            }
        }
        setValues({
            price
        })
    }
    
    
    
    render(){
        const { classes } = this.props
        return(
            <Formik
                initialValues={{
                    product: null,
                    size: null,
                    color: 'Negro',
                    quantity: 0,
                    price: 0
                }}
            >
                {
                    ({handleSubmit, setValues, values, handleChange, handleBlur})=>{
                        if(values.product){
                            
                        }
                        return(
                            <form className={classes.form} onSubmit={handleSubmit}>
                               <Grid container spacing={16}>
                                    <Grid item md={12}>
                                        <Field
                                            onChange={this.handleProductChange(setValues)}
                                            myPlaceholder="Prenda" 
                                            className={classes.input} 
                                            name="product" 
                                            component={MyAsyncAutomoplete} 
                                            promiseOptions={selectSearch} />
                                    </Grid>
                                    
                                    <Grid item md={3}>
                                        <TextField
    
                                            fullWidth
                                            label="talla"
                                            variant='outlined'
                                        />
                                    </Grid>
    
                                    <Grid item md={3}>
                                        <TextField
                                                fullWidth
                                                label="Color"
                                                variant='outlined'
                                            />
                                    </Grid>
    
                                    <Grid item md={3}>
                                        <TextField

                                            fullWidth
                                            label="Cantidad"
                                            variant='outlined'
                                            />
                                    </Grid>
    
                                    <Grid item md={3}>
                                        <TextField
                                                helperText={this.state.labelText}
                                                value={values.price}
                                                onChange={this.myCustomHandleChange(handleChange('price'))}
                                                onBlur={handleBlur('price')}
                                                name="price"
                                                fullWidth
                                                label="Valor"
                                                variant='outlined'
                                                InputProps={{
                                                    inputComponent: NumberFormatCustom,
                                                    //onChange: this.myCustomHandleChange(handleChange('price')),
                                                    //onBlur: handleBlur('price')
                                                }}   
                                            />
                                    </Grid>
                               </Grid>
                            </form>
                        )
                    }
                }
            </Formik>
        )
    }
}



export default withStyles(styles)(ProductForm)