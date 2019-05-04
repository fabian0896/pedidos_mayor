import React, { useState, useEffect } from 'react'
import { withFormik } from 'formik'
import { 
    Grid, 
    TextField, 
    Button, 
    withStyles, 
    Typography,
    MenuItem,
    InputAdornment,
} from '@material-ui/core';
import { compose } from 'redux'
import BoxIcon from '../../../assets/box.svg'
import Title from '../../../componets/title/Title'
import NumberFormat from 'react-number-format';
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




const ShippingUnit = withFormik({
    mapPropsToValues: props=>({
        width: 0,
        height: 0,
        large: 0,
        weight: 0,
        quantity: 0
    }),
    handleSubmit: (values, actions)=>{
        actions.resetForm()
        actions.props.handleSubmit(values, actions)
    },
    validationSchema: (props)=> Yup.object().shape({
        quantity: Yup.number().min(1,'No se puede enviar menos de 1 prenda').max(props.maxProducts, 'no se pueden enviar mas prendas que las pendientes').required(),
        width: Yup.number().min(1).required(),
        large: Yup.number().min(1).required(),
        height: Yup.number().min(1).required(),
        weight: Yup.number().required()
    })
})(({handleSubmit, values, handleChange, handleBlur, maxProducts, errors, touched})=>{

    return(
        <form onSubmit={handleSubmit}>
            <Grid container spacing={16}>

                <Grid item md={2} >
                    <TextField
                        error={errors.width && touched.width}
                        disabled={!maxProducts}
                        type="number"
                        autoFocus
                        fullWidth
                        variant="outlined"
                        name="width"
                        label="Ancho"
                        value={values.width}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </Grid>
                <Grid item md={2} >
                    <TextField
                        error={errors.height && touched.height}
                        disabled={!maxProducts}
                        type="number"
                        fullWidth
                        variant="outlined"
                        name="height"
                        label="Alto"
                        value={values.height}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </Grid>
                <Grid item md={2} >
                    <TextField
                        error={errors.large && touched.large}
                        disabled={!maxProducts}
                        type="number"
                        fullWidth
                        variant="outlined"
                        name="large"
                        label="Largo"
                        value={values.large}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </Grid>
                <Grid item md={3} >
                    <TextField
                        error={errors.weight && touched.weight}
                        disabled={!maxProducts}
                        type="number"
                        fullWidth
                        variant="outlined"
                        name="weight"
                        label="Peso(kg)"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">Kg</InputAdornment>
                        }}
                        value={values.weight}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </Grid>
                <Grid item md={3} >
                    <TextField
                        helperText={touched.quantity && errors.quantity}
                        error={errors.quantity && touched.quantity}
                        disabled={!maxProducts}
                        type="number"
                        fullWidth
                        variant="outlined"
                        name="quantity"
                        label="Prendas"
                        value={values.quantity}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        type="submit" 
                        variant="contained"
                        color="primary"
                        size="medium"
                        fullWidth >
                        Agregar
                    </Button>
                </Grid>

            </Grid>
        </form>
    )
})






const ListShippingUnits = withStyles(theme=>({
    root:{
        marginTop: theme.spacing.unit*3
    },
    list:{
        listStyle: 'none',
        padding: `${theme.spacing.unit*0}px ${theme.spacing.unit*2}px`,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.grey[300]}`
    },
    listItem:{
        display: 'flex',
        alignItems: 'center',
        margin: `${theme.spacing.unit}px 0`,
    },
    iconWraper:{
        marginRight: theme.spacing.unit*2,
    },
    icon:{
        width: 30
    },
    info:{
        display: 'flex',
        justifyItems: 'center',
        width: '100%',
        //paddingRight: theme.spacing.unit*2,
        '& > :first-child':{
            flex: 1
        },
    },
    resume:{
        borderTop: `1px solid ${theme.palette.grey[300]}`,
           paddingTop: theme.spacing.unit
    }
}))(({value, classes, totalProducts, totalWeight, pendingProducts})=>{

    return(
        <div className={classes.root}>
            <ul className={classes.list}>
            {
                value.map((item, index)=>(
                    <li key={index} className={classes.listItem}>
                        <div className={classes.iconWraper}>
                            <img className={classes.icon} src={BoxIcon} alt="Box"/>
                        </div>
                        <div className={classes.info}>
                            <div>
                                <Typography variant="subtitle1">Caja #{index + 1} ({`${item.weight}Kg`})</Typography>
                                <Typography color="textSecondary">{`${item.width}cm x ${item.height}cm x ${item.large}cm`}</Typography>
                            </div>
                            <div>
                                <Typography align="right" variant="h6">{item.quantity}</Typography>
                                <Typography style={{lineHeight: 1}} align="right" color="textSecondary">Prendas</Typography>
                            </div>
                        </div>
                    </li>
                ))
            }
            <li className={classes.listItem}>
                <div className={classes.info + " " + classes.resume}>
                    <div>
                        <Typography align="left" variant="h6">{`${totalWeight}Kg`}</Typography>
                        <Typography style={{lineHeight: 1}} align="left" color="textSecondary">Peso Total</Typography>
                    </div>
                    <div>
                        <Typography align="right" variant="h6">{`${totalProducts}/${pendingProducts}`}</Typography>
                        <Typography style={{lineHeight: 1}} align="right" color="textSecondary">Prendas Totales</Typography>
                    </div>
                </div>
            </li>
            </ul>
        </div>
    )
})







const styles =  theme =>({
    form:{
        width: 450,
        marginTop: theme.spacing.unit*2
    },
    productInfo:{
        marginBottom: theme.spacing.unit*3
    }
})


function ProductShippingForm(props){
    const { 
        classes, 
        order, 
        values,
        errors,
        touched, 
        setFieldValue,
        handleChange,
        handleBlur,
        submitForm,
        getSubmitRef
    } = props

    const [totalWeight, setTotalWeight] = useState(0)
    const [totalProducts, setTotalProducts] = useState(0)


    useEffect(()=>{
        getSubmitRef(submitForm)
    }, [getSubmitRef])

    function handleSubmit(formValues, actions){
        const newArray = values.shippingUnits.slice()
        newArray.push(formValues)


        const totalWeight = newArray.reduce((prev, current)=>{
            return prev + current.weight
        }, 0)
        const totalProducts = newArray.reduce((prev, current)=>{
            return prev + current.quantity
        }, 0)


        setTotalProducts(totalProducts)
        setTotalWeight(totalWeight)
        
        setFieldValue('shippingUnits', newArray)
    }

    return(       
        <div className={classes.form}>
            <div className={classes.productInfo}>
                <Typography align="center" variant="h6">{order.pendingProducts}</Typography>
                <Typography align="center" color="textSecondary" variant="subtitle2">Prendas pendientes</Typography>
            </div>

            <Title size="small" primary="Empaques" align="left"/>
            <ShippingUnit
                maxProducts={order.pendingProducts - totalProducts} 
                handleSubmit={handleSubmit}/>
            <ListShippingUnits
                pendingProducts={order.pendingProducts}
                totalWeight={totalWeight}
                totalProducts={totalProducts} 
                value={values.shippingUnits}/>
            <Typography color="error">{touched.shippingUnits && errors.shippingUnits}</Typography>

            <Title style={{marginTop: 24}} size="small" primary="Precios" align="center"/>
            <Grid container spacing={24}>
                <Grid item md={4}>
                    <TextField
                        error={errors.price && touched.price}
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="price"
                        label="Precio"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                            onChange: handleChange('price'),
                            onBlur: handleBlur('price')
                        }}   
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </Grid>
                <Grid item md={4}>
                    <TextField
                        error={errors.currency && touched.currency}
                        select
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="currency"
                        label="Moneda"
                        value={values.currency}
                        onChange={handleChange}
                        onBlur={handleBlur}>
                        <MenuItem value="USD">
                            USD
                        </MenuItem>    
                        <MenuItem value="COP">
                            COP
                        </MenuItem>    
                    </TextField>
                </Grid>
                <Grid item md={4}>
                    <TextField
                        error={errors.company && touched.company}
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="company"
                        label="Empresa"
                        value={values.weight}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </Grid>
            </Grid>
        </div>
    )
}



export default compose(
    withFormik({
        mapPropsToValues: (props)=>({
            shippingUnits: [],
            price: 0,
            company: '',
            currency: ''
        }),
        handleSubmit: (values,actions)=>{
            actions.props.handleSubmit(values, actions)
        },
        validationSchema: (props) => Yup.object().shape({
            shippingUnits: Yup.array().min(1, 'No hay unidades de empaque').required(),
            price: Yup.number().min(1).required(),
            company: Yup.string().required(),
            currency: Yup.string().required()
        })
    }),
    withStyles(styles)
)(ProductShippingForm)