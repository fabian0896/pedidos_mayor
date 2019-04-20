import React from 'react';
import { Formik, Field } from 'formik'
import { selectSearch } from '../../../lib/searchService'
import MyAsyncAutomoplete from '../../../componets/myAutocomplete/MyAsyncAutocomplete'
import { withStyles, Grid, TextField, Button, MenuItem } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { SIZES } from '../../../lib/enviroment.js'
import * as Yup from 'yup'


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


//-----------------------------------------------------------------------------------------------------------


const styles = theme =>({
    input:{

    },
    form:{
        width: 450,
        padding: theme.spacing.unit*2
    }
})


const validationFormInfoSchema = Yup.object().shape({
    product: Yup.object().required('La prenda es requerida'),
    size: Yup.number().required('valor requerido'),
    quantity: Yup.number().required('valor requerido'),
    color: Yup.string().required('valor requerido'),
    price: Yup.number().required('valor Requerido')
})


class ProductFormInfo extends React.Component{

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
       setValues('price', price) 
    }
    
    
    
    render(){
        const { classes, handleSubmit } = this.props
        return(
            <Formik
                initialValues={{
                    product: null,
                    size: 28,
                    color: '',
                    quantity: '',
                    price: ''
                }}
                validationSchema={validationFormInfoSchema}
                onSubmit={handleSubmit}
            >
                {
                    ({handleSubmit, values, handleChange, handleBlur, setFieldValue, errors, touched, isSubmitting})=>{
                        if(values.product){
                            
                        }
                        return(
                            <form className={classes.form} onSubmit={handleSubmit}>
                               <Grid container spacing={16}>
                                    <Grid item md={12}>
                                        <Field
                                            error={errors.product && touched.product}
                                            onChange={this.handleProductChange(setFieldValue)}
                                            myPlaceholder="Prenda" 
                                            className={classes.input} 
                                            name="product" 
                                            component={MyAsyncAutomoplete} 
                                            promiseOptions={selectSearch} />
                                    </Grid>
                                    
                                    <Grid item md={3}>
                                        <TextField
                                            disabled={!values.price}
                                            error={errors.size && touched.size}
                                            name="size"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.size}
                                            select
                                            fullWidth
                                            label="talla"
                                            variant='outlined'
                                        >
                                            {
                                                SIZES.map(size=>(
                                                    <MenuItem 
                                                        key={size.number} 
                                                        value={size.number}>
                                                            { size.letter }
                                                    </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </Grid>
    
                                    <Grid item md={3}>
                                        <TextField
                                            disabled={!values.price}
                                            error={errors.color && touched.color}
                                            name="color"
                                            value={values.color}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            fullWidth
                                            label="Color"
                                            variant='outlined'
                                            />
                                    </Grid>
    
                                    <Grid item md={3}>
                                        <TextField
                                            disabled={!values.price}
                                            error={errors.quantity && touched.quantity}
                                            value={values.quantity}
                                            name="quantity"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            fullWidth
                                            label="Cantidad"
                                            variant='outlined'
                                            />
                                    </Grid>
    
                                    <Grid item md={3}>
                                        <TextField
                                            disabled={!values.price}
                                            error={errors.price && touched.price}
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

                                    <Grid item md={12}>
                                        <Button
                                            disabled={isSubmitting}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            fullWidth
                                        >
                                            Agregar
                                        </Button>
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

ProductFormInfo = withStyles(styles)(ProductFormInfo)



//-----------------------------------------------------------------------------------------------



class ProductFrom extends React.Component{
    
    handleSubmit = (values, actions)=>{
        console.log(values)
        actions.setSubmitting(false)
        actions.resetForm()
    }

    
    render(){
        const { customPrices, allProducts } = this.props
        return(
            <div>
                <ProductFormInfo
                    handleSubmit={this.handleSubmit} 
                    customPrices={customPrices} 
                    allProducts={allProducts} />


            </div>
        )
    }
}


export default ProductFrom