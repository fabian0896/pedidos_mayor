import React from 'react'
import { withFormik, Field } from 'formik'
import MyAutocomplete from '../../componets/myAutocomplete/MyAutocomplete'
import { withStyles, Grid, TextField, Button, Typography } from '@material-ui/core'
import { compose } from 'redux'
import NumberFormat from 'react-number-format';
import * as Yup from 'yup'


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
    value: Yup.number().required('Valor re  querido'),
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
        onClose
    } = props
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
                {
                    values.order &&
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="textSecondary">Saldo:</Typography>
                        <MoneyValue currency={values.order.currency} amount={values.order.balance.toFixed(1)}>
                            <Typography variant="h6"></Typography>
                        </MoneyValue>
                    </Grid>
                }
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={errors.value && touched.value}
                        onChange={handleChange('value')}
                        onBlur={handleBlur('value')}
                        value={values.value}
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
                value: 0,
                paymentMethod: '',
                reference: ''
            }
        },
        handleSubmit: (values, actions)=>{
            actions.props.handleSubmit(values, actions)
        },
        validationSchema
    }),
    withStyles(styles)
)(PaymentForm)