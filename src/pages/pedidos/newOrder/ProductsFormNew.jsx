import React, { Fragment } from 'react';
import { Formik, Field, withFormik } from 'formik'
import { selectSearch } from '../../../lib/searchService'
import MyAsyncAutomoplete from '../../../componets/myAutocomplete/MyAsyncAutocomplete'
import { withStyles, Grid, TextField, Button, MenuItem, IconButton, Divider, Chip, Avatar } from '@material-ui/core';
import {Add} from '@material-ui/icons'
import NumberFormat from 'react-number-format';
import { SIZES } from '../../../lib/enviroment.js'
import * as Yup from 'yup'
import OrderProductTable from '../orderDetails/OrderProductTableNew';
import { useFormik } from 'formik'

import { makeStyles } from '@material-ui/styles'




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

const AddSizeFormSchema = Yup.object().shape({
    size: Yup.number(),
    quantity: Yup.number().min(1, "Tienas que agregar por lo menos 1 prenda")
})

const AddSizeForm = ({onChange, value, disable}) => {

    const formik = useFormik({
        initialValues: {
            size: 32,
            quantity: 1
        },
        onSubmit: (size, actions) => {
            const isTheSame = value.reduce((prev,curr, currIndex)=>{
                if(parseInt(size.size) === parseInt(curr.size)){
                    return currIndex
                } else{
                    return prev
                }
            }, -1)

            if(isTheSame > -1){
                
                onChange({
                    size: value[isTheSame].size, 
                    quantity: parseInt(value[isTheSame].quantity) + parseInt(size.quantity)
                }, isTheSame)
            }else{
                onChange(size, value.length)
            }

            actions.resetForm()
        },
        validationSchema: AddSizeFormSchema
    })

    return (
        <Fragment>
                    
                    <Grid item xs={5} sm={5} md={5}>
                        <TextField
                            disabled={disable}
                            error={!!formik.errors.size}
                            name="size"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.size}
                            select
                            fullWidth
                            label="talla"
                            variant='outlined'
                        >
                            {
                                SIZES.map(size => (
                                    <MenuItem
                                        key={size.number}
                                        value={size.number}>
                                        {size.letter}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </Grid>

                    <Grid item xs={5} sm={5} md={5}>
                        <TextField
                            disabled={disable}
                            error={!!formik.errors.quantity}
                            value={formik.values.quantity}
                            name="quantity"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            label="Cantidad"
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2}>
                            <IconButton
                                disabled={disable}
                                color="primary"
                                size="medium" 
                                onClick={formik.handleSubmit} >
                                <Add />
                            </IconButton>
                    </Grid>

        </Fragment>
    )
}

//-----------------------------------------------------------------------------------------------------------

const useBadgeStyle = makeStyles(({
    badge: {
        marginRight: 5,
        marginTop: 8
    }
}))


const SizeBadges = ({value, onDelete})=>{

    const clases = useBadgeStyle()

    return(
        <Fragment>
            <Grid item sm={12}>
                {
                    value.map((sizeGroup, index)=>{
                        return(
                        <Chip
                            onDelete={onDelete(index, value)}
                            color="secondary"
                            className={clases.badge}
                            key={index}
                            avatar={<Avatar>{sizeGroup.size}</Avatar>} 
                            label={ sizeGroup.quantity} />
                        )
                    })
                }
            </Grid>
        </Fragment>
    )
}



//-----------------------------------------------------------------------------------------------------------


const styles = theme => ({
    input: {

    },
    form: {
        width: 450,
        paddingBottom: theme.spacing.unit * 3,
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    }
})


const validationFormInfoSchema = Yup.object().shape({
    product: Yup.object().required('La prenda es requerida'),
    label: Yup.string().required('valor requerido'),
    mold: Yup.string().required('valor requerido'),
    color: Yup.string().required('valor requerido'),
    price: Yup.number().required('valor Requerido'),
    sizes: Yup.array().min(1, 'tienes que agregar por lo menos una talla')
})


class ProductFormInfo extends React.Component {

    state = {
        labelText: '',
        productId: ''
    }

    myCustomHandleChange = (handleChange) => (event) => {
        handleChange(event)
        const { productId } = this.state
        const { customPrices } = this.props
        const actualProduct = customPrices[productId]
        if (actualProduct) {
            if (actualProduct.cop === parseInt(event.target.value)) {
                this.setState({ labelText: 'Precio personalizado' })
                return
            }
        }
        this.setState({ labelText: '' })
    }

    handleProductChange = (setValues) => (option) => {
        const { allProducts, customPrices, currency, client } = this.props
        let price = ""
        const _currency = currency.toLowerCase()
        if (option) {
            const id = option.value
            if (customPrices[id]) {
                if (customPrices[id][_currency]) {
                    price = customPrices[id][_currency]
                    this.setState({ labelText: 'Precio personalizado', productId: id })
                } else {
                    price = allProducts[id][_currency]
                    this.setState({ labelText: '', productId: '' })
                }
            } else {
                price = allProducts[id][_currency]
                this.setState({ labelText: '', productId: '' })
            }
        }
        setValues('price', price)
        setValues('label', client.label || 'generic')
        setValues('mold', client.mold || 'new')
    }

    handleAddSize  = (setValue) => (value, index) =>{
        setValue(`sizes[${index}]`, value)
    }

    handleDeleteSize = (setValue) => (index, value) => () =>{
        const newValue = [...value]
        newValue.splice(index,1)
        setValue('sizes', newValue)
    }

    render() {
        const { classes, handleSubmit, getSetValuesRef, isEditting } = this.props
        return (
            <Formik
                initialValues={{
                    product: null,
                    color: '',
                    price: '',
                    label: '',
                    mold: '',
                    sizes:[]
                }}
                validationSchema={validationFormInfoSchema}
                onSubmit={(values, actions) => handleSubmit(values, actions, this.selectRef)}
            >
                {
                    ({ handleSubmit, values, handleChange, handleBlur, setFieldValue, errors, touched, isSubmitting, setValues }) => {

                        getSetValuesRef(setValues)

                        return (
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <Grid container spacing={16}>
                                    <Grid item xs={12} md={12}>
                                        <Field
                                            disable={!!values.sizes.length}
                                            getRef={node => this.selectRef = node}
                                            error={errors.product && touched.product}
                                            onChange={this.handleProductChange(setFieldValue)}
                                            myPlaceholder="Prenda"
                                            className={classes.input}
                                            name="product"
                                            component={MyAsyncAutomoplete}
                                            promiseOptions={selectSearch} />
                                    </Grid>

                                    {/*<Grid item xs={6} sm={4} md={4}>
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
                                        </Grid> */}

                                    <Grid item xs={6} sm={6} md={6}>
                                        <TextField
                                            disabled={!values.product || !!values.sizes.length}
                                            error={errors.color && touched.color}
                                            name="color"
                                            value={values.color}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            fullWidth
                                            label="Color/Variante"
                                            variant='outlined'
                                        />
                                    </Grid>

                                    {/*<Grid item xs={6} sm={3} md={3}>
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
                                    </Grid> */}

                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField
                                            disabled={!values.product || !!values.sizes.length}
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
                                            disabled={!values.product || !!values.sizes.length}
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
                                            disabled={!values.product || !!values.sizes.length}
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

                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>


                                    <AddSizeForm
                                        disable={!values.color || !values.product} 
                                        value={values.sizes} 
                                        onChange={this.handleAddSize(setFieldValue)} />

                                    <SizeBadges
                                        onDelete={this.handleDeleteSize(setFieldValue)} 
                                        value={values.sizes} />              

                                    <Grid item xs={12} sm={12} md={12}>
                                        <Button
                                            disabled={isSubmitting || (values.sizes.length <= 0)}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            fullWidth
                                        >
                                            {isEditting ? 'Editar' : 'Agregar'}
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



class ProductFrom extends React.Component {

    state = {
        isEditting: false,
        editIndex: -1
    }

    setValuesForm = () => { }

    handleSubmit = (productValues, actions, selectRef) => {


        const { isEditting, editIndex } = this.state
        const { setFieldValue, values, allProducts } = this.props
        let finalProducts = []
        
        let editProducts = {}

        //const newProduct = {
        //    ...allProducts[productValues.product.value],
        //    ...productValues
        //}



        const newProductarray = productValues.sizes.map(({size, quantity})=>{
            const temp = {
                ...allProducts[productValues.product.value],
                ...productValues,
                size,
                quantity
            }

            delete temp.sizes

            return temp
        })


        if (isEditting) {
            //finalProducts = values.products.slice()
            editProducts = this.handleDelete(editIndex)(true)
            
            //finalProducts[editIndex] = newProduct
        } 
            //finalProducts = this.mergeDuplicated(newProduct, values)
            // Me devuelve un arreglo con los los products
            
        finalProducts = newProductarray.reduce((prev, curr)=>{
            return{
                products: this.mergeDuplicated(curr, prev)
            }
        }, isEditting? editProducts : values)

        
        this.setState({ isEditting: false, editIndex: -1 })
        setFieldValue('products', finalProducts.products)
        actions.setSubmitting(false)
        actions.resetForm()
        selectRef.focus()
    }

    mergeDuplicated(product, values) {
        const { products } = values
        const index = products.findIndex(item => {
            return (
                item.reference === product.reference &&
                item.size === product.size &&
                item.price === product.price &&
                item.color.toLowerCase() === product.color.toLowerCase() &&
                item.label === product.label &&
                item.mold === product.mold
            )
        })

        if (index < 0) {
            return [...products, product]
        }

        const newProducts = products.slice()
        newProducts[index].quantity = parseInt(newProducts[index].quantity) + parseInt(product.quantity)
        return newProducts
    }



    handleDelete = (productGroup) => (variant=false) => {
        const { values, setFieldValue, isEditting } = this.props

        const products = values.products.slice()
        
        const indexes = products.reduce((prev,curr, index)=>{
            if(curr.reference === productGroup.reference &&
                curr.color === productGroup.color &&
                curr.mold === productGroup.mold &&
                curr.label === productGroup.label &&
                curr.price === productGroup.price){
                    return [...prev, index]
                } else{
                    return prev
                }
        }, [])

        indexes.forEach(index=>{
            products.splice(index, 1, 0) // pongo un 0 en las posciciones que hay que borrar para luego saber y quitarlas del array
        })

        const finalProducts = products.reduce((prev, curr)=>{
            if(curr !== 0){
                return [...prev, curr]
            } else{
                return prev
            }
        }, [])



        if(typeof variant !== 'object'){
            return {
                products: finalProducts
            }
        }

        setFieldValue('products', finalProducts)
    }


    handleEdit = (productGroup) => () => {


        //const { values } = this.props
        //const products = values.products
        const edittingProduct = productGroup

        const formatSizes = Object.keys(productGroup.sizes).map(size=>{
            return{
                size,
                quantity: productGroup.sizes[size]
            }
        })

        this.setState({ isEditting: true, editIndex: productGroup })
        this.setValuesForm({
            product: edittingProduct.product,
            sizes: formatSizes,
            color: edittingProduct.color,
            price: edittingProduct.price,
            label: edittingProduct.label,
            mold: edittingProduct.mold
        })
    }

    getSetValueRef = (setValue) => {
        this.setValuesForm = setValue
    }

    componentDidMount() {
        const { saveSubmitRef, submitForm } = this.props
        saveSubmitRef(submitForm)
    }


    render() {
        const {
            customPrices,
            allProducts,
            values,
            currency,
            client
        } = this.props
        const { isEditting } = this.state
        return (
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
    mapPropsToValues: (props) => ({
        products: props.initialValues || []
    }),
    handleSubmit: (values, actions) => {
        actions.props.handleSubmit(values, actions)
    }
})(ProductFrom)