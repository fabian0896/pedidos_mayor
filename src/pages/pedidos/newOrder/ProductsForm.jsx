import React from 'react';
import { Formik, Field, withFormik } from 'formik'
import { selectSearch } from '../../../lib/searchService'
import MyAsyncAutomoplete from '../../../componets/myAutocomplete/MyAsyncAutocomplete'
import { withStyles, Grid, TextField, Button, MenuItem } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { SIZES } from '../../../lib/enviroment.js'
import * as Yup from 'yup'
import OrderProductTable from '../orderDetails/OrderProductTable';



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
        paddingBottom: theme.spacing.unit*3,
        [theme.breakpoints.down('md')]:{
            width: '100%'
        }
    }
})


const validationFormInfoSchema = Yup.object().shape({
    product: Yup.object().required('La prenda es requerida'),
    size: Yup.number().required('valor requerido'),
    quantity: Yup.number().required('valor requerido'),
    color: Yup.string().required('valor requerido'),
    price: Yup.number().required('valor Requerido'),
    details: Yup.string()
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
        const { allProducts, customPrices, currency, client } = this.props
        let price = ""
        const _currency = currency.toLowerCase()
        if(option){
            const id = option.value
            if(customPrices[id]){
                if(customPrices[id][_currency]){
                    price = customPrices[id][_currency]
                    this.setState({labelText: 'Precio personalizado', productId: id})
                }else{
                    price = allProducts[id][_currency]
                    this.setState({labelText: '', productId: ''})
                }
            }else{
                price = allProducts[id][_currency]
                this.setState({labelText: '', productId: ''})
            }
        }
       setValues('price', price)  
       setValues('label', client.label || 'generic')
       setValues('mold', client.mold || 'new')
    }
    
    
    
    render(){
        const { classes, handleSubmit, getSetValuesRef, isEditting } = this.props
        return(
            <Formik
                initialValues={{
                    product: null,
                    size: 28,
                    color: '',
                    quantity: '',
                    price: '',
                    label: '',
                    mold: '',
                    details: ''
                }}
                validationSchema={validationFormInfoSchema}
                onSubmit={(values, actions)=> handleSubmit(values,actions, this.selectRef)}
            >
                {
                    ({handleSubmit, values, handleChange, handleBlur, setFieldValue, errors, touched, isSubmitting, setValues})=>{
                        
                        getSetValuesRef(setValues)

                        return(
                            <form className={classes.form} onSubmit={handleSubmit}>
                               <Grid container spacing={16}>
                                    <Grid item xs={12} md={12}>
                                        <Field
                                            getRef={node => this.selectRef = node}
                                            error={errors.product && touched.product}
                                            onChange={this.handleProductChange(setFieldValue)}
                                            myPlaceholder="Prenda" 
                                            className={classes.input} 
                                            name="product" 
                                            component={MyAsyncAutomoplete} 
                                            promiseOptions={selectSearch} />
                                    </Grid>
                                    
                                    <Grid item xs={6} sm={3} md={3}>
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
    
                                    <Grid item xs={6} sm={3} md={3}>
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
    
                                    <Grid item xs={6} sm={3} md={3}>
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
    
                                    <Grid item xs={6} sm={3} md={3}>
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

                                    <Grid item xs={6} sm={6} md={6}>
                                        <TextField
                                            select
                                            disabled={!values.price}
                                            error={errors.label && touched.label}
                                            value={values.label}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="label"
                                            fullWidth
                                            label="Marquilla"
                                            variant='outlined'
                                            >
                                                <MenuItem value="custom">Personalizada</MenuItem>
                                                <MenuItem value="generic">Generíca</MenuItem>
                                            </TextField>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6}>
                                        <TextField
                                            select
                                            disabled={!values.price}
                                            error={errors.mold && touched.mold}
                                            value={values.mold}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="mold"
                                            fullWidth
                                            label="Molde"
                                            variant='outlined'
                                            >
                                                <MenuItem value="new">Molde Nuevo</MenuItem>
                                                <MenuItem value="old">Molde Viejo</MenuItem>
                                            </TextField>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <Button
                                            disabled={isSubmitting}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            fullWidth
                                        >
                                            { isEditting? 'Editar': 'Guardar' }
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
    
    state={
        isEditting: false,
        editIndex: -1
    }

    setValuesForm = ()=>{}

    handleSubmit = (productValues, actions, selectRef)=>{
        const { isEditting, editIndex } = this.state
        const { setFieldValue, values, allProducts } = this.props
        let finalProducts = []
        const newProduct = {
            ...allProducts[productValues.product.value],
            ...productValues
        }

        if(isEditting){
            finalProducts = values.products.slice()
            finalProducts[editIndex] = newProduct
        }else{
            finalProducts = this.mergeDuplicated(newProduct, values)
        }
        this.setState({isEditting: false, editIndex: -1})
        setFieldValue('products', finalProducts)
        actions.setSubmitting(false)
        actions.resetForm()
        selectRef.focus()
    }

    mergeDuplicated(product, values){
        const {products} = values
        const index = products.findIndex(item =>{
            return( 
                item.reference === product.reference &&
                item.size === product.size &&
                item.price === product.price &&
                item.color.toLowerCase() === product.color.toLowerCase() &&
                item.label === product.label &&
                item.mold === product.mold
                )
        })
    
        if(index < 0){
            return [...products, product]
        }

        const newProducts = products.slice()
        newProducts[index].quantity = parseInt(newProducts[index].quantity) + parseInt(product.quantity)
        return newProducts
    }


    handleDelete = (index)=>()=>{
        const { values, setFieldValue } = this.props
        const products = values.products.slice()
        products.splice(index, 1)
        setFieldValue('products', products)
    }

    handleEdit = (index) => () => {
        const { values } = this.props
        const products = values.products
        const edittingProduct = products[index]
        this.setState({isEditting: true, editIndex: index})
        this.setValuesForm({
            product: edittingProduct.product,
            size: edittingProduct.size,
            color: edittingProduct.color,
            quantity: edittingProduct.quantity,
            price: edittingProduct.price,
            label: edittingProduct.label,
            mold: edittingProduct.mold
        })
    }

    getSetValueRef = (setValue)=>{
        this.setValuesForm = setValue
    }

    componentDidMount(){
        const { saveSubmitRef, submitForm} =  this.props
        saveSubmitRef(submitForm)
    }

    
    render(){
        const { 
            customPrices, 
            allProducts,
            values,
            currency,
            client
         } = this.props
         const { isEditting } = this.state
        return(
            <div >
                <ProductFormInfo
                    client={client}
                    currency={currency}
                    getSetValuesRef={this.getSetValueRef}
                    isEditting={isEditting}
                    handleSubmit={this.handleSubmit} 
                    customPrices={customPrices} 
                    allProducts={allProducts} />
                <OrderProductTable
                    currency={currency}
                    withTotal
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    withEdittingButtons
                    data={values.products}
                />
            </div>
        )
    }
}


export default withFormik({
    mapPropsToValues:(props)=>({
        products: props.initialValues || []
    }),
    handleSubmit: (values, actions)=>{
        actions.props.handleSubmit(values, actions)
    }
})(ProductFrom)