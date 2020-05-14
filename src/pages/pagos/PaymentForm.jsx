import React from 'react'
import { withFormik, Field } from 'formik'
import MyAutocomplete from '../../componets/myAutocomplete/MyAutocomplete'
import { withStyles, Grid, TextField, Button, Typography, Divider, Checkbox, FormControlLabel } from '@material-ui/core'
import { compose } from 'redux'
import NumberFormat from 'react-number-format';
import * as Yup from 'yup'
import { green } from '@material-ui/core/colors'
import { thousandSeparator } from '../../lib/utilities'



const MoneyValue = ({amount, children, currency})=>(
    <NumberFormat 
        value={amount} 
        displayType={'text'} 
        thousandSeparator={true} 
        prefix={`${currency !== 'COP'? currency + " " : ''}$`} 
        renderText={value => (
            React.cloneElement(children, {
                children: value
            })
        )}
    />
)

const validationSchema = Yup.object().shape({
    order: Yup.object().required('valor requerido'),
    paymentMethod: Yup.string().required('Valor requerido'),
    value: Yup.number().min(1, 'El valor no puede ser 0').required('Valor re  querido'),
    reference: Yup.string().required('Valor requerido')
})


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

    }
})


function PaymentForm(props){
    const { 
        touched ,
        errors, 
        values, 
        classes, 
        isEditing,
        options,
        handleSubmit,
        handleChange,
        handleBlur,
        onClose,
    } = props


    const customHandleChange = (e) =>{
        const { setFieldValue } = props
        handleChange(e)
        if(!values.usePositiveBalance){
            setFieldValue('reference', '----')
            setFieldValue('paymentMethod', '----')
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Field
                        disabled={isEditing}
                        error={errors.order && touched.order}
                        myPlaceholder="Pedido"
                        className={classes.input}
                        name="order"
                        component={MyAutocomplete}
                        optionsList={options} />
                </Grid>

                <Grid item xs={12}><Divider/></Grid>

                <Grid item xs={12}>
                    <Typography variant="subtitle1" color="textSecondary">Saldo a favor:</Typography>
                    <MoneyValue currency={values.order? values.order.currency : 'COP'} amount={(values.order.client.positiveBalance || 0).toFixed(2)}>
                        <Typography style={{color: green['A700']}} variant="h6"></Typography>
                    </MoneyValue>

                    <FormControlLabel
                        control={<Checkbox 
                            name="usePositiveBalance" 
                            checked={values.usePositiveBalance} 
                            onChange={customHandleChange} />}
                        label="Usar saldo a favor"
                    />

                   

                </Grid>

                
                {
                    values.order &&
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="textSecondary">Saldo del Pedido:</Typography>
                        <MoneyValue currency={values.order.currency} amount={values.order.balance.toFixed(2)}>
                            <Typography  variant="h6"></Typography>
                        </MoneyValue>
                    </Grid>
                }
                
                <Grid item xs={12}><Divider/></Grid>
                
                <Grid item xs={12} sm={6}>
                    
                    <TextField
                        error={errors.value && touched.value}
                        onChange={handleChange('value')}
                        onBlur={handleBlur('value')}
                        value={values.value}
                        helperText={errors.value}
                        name="value"
                        label="Valor"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled={values.usePositiveBalance}
                        error={errors.reference && touched.reference}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.reference}
                        name="reference"
                        label="Referencia de pago"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        disabled={values.usePositiveBalance}
                        error={errors.paymentMethod && touched.paymentMethod}   
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.paymentMethod}
                        name="paymentMethod"
                        label="Metodo de Pago"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={6}>
                    <Button
                        onClick={onClose}
                        size="large"
                        color="secondary"
                        fullWidth
                    >
                        cancelar
                    </Button>
                </Grid>

                <Grid item xs={6}>
                    <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth >
                        Guardar
                    </Button>
                </Grid>

            </Grid>
            
        </form>
    )
}






export default compose(
    withFormik({
        mapPropsToValues: (props)=>{
            const orderId = props.order? props.order.id : ''
            const order = props.options.find(item=>item.value === orderId)
            return{
                order,
                value: 0.00,
                paymentMethod: '',
                reference: '',
                usePositiveBalance: false
            }
        },
        handleSubmit: (values, actions)=>{
            actions.props.handleSubmit(values, actions)
        },
        validate: (values, props)=>{
            const errors = {}
            
            if(values.usePositiveBalance){

                const inputvalue = parseFloat(parseFloat(values.value).toFixed(2))
                const positiveBalance = parseFloat(parseFloat(values.order.client.positiveBalance).toFixed(2))

                if(inputvalue > positiveBalance){
                    errors.value = `El saldo a favor es de $${thousandSeparator(positiveBalance)}`
                }
            }

            return errors
        },
        validationSchema
    }),
    withStyles(styles)
)(PaymentForm)