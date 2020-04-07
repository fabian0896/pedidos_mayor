import React, { Fragment } from 'react'
import {
    withStyles, 
    Paper,
    Typography, 
    Divider,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    InputAdornment,
    Button,
    Checkbox
} from '@material-ui/core'
import {updateCommissionPaymet} from '../../../lib/firebaseService'
import {COMMISSIONS} from '../../../lib/enviroment'
import { useFormik } from 'formik'
import NumberFormat from 'react-number-format';
import { thousandSeparator} from '../../../lib/utilities'


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




const CommissionCard = withStyles(theme=>({
   root:{
       overflow:'hidden',
       marginBottom: theme.spacing.unit*2
   },
   header:{
       background: theme.palette.secondary.dark,
       color: theme.palette.secondary.contrastText,
       padding: theme.spacing.unit*2,
   },
   body:{
       padding: theme.spacing.unit*2,

   },
   divider:{
       margin: `${theme.spacing.unit*2}px ${theme.spacing.unit}px`
   }
}))(({classes, data,onUpdate,...props})=>{

    const formik = useFormik({
        initialValues:{
            paymenthCommissionName: data.paymethCommissionName || '',
            paymenthCommission: data.paymenthCommission || 0,
            useBaseValue: data.useBaseValue || true,
            baseValue: data.commissionBaseValue || 0,
        },
        onSubmit: async (values, actions) =>{
            let commissionValue = 0
            if(values.paymenthCommissionName !== 'other'){
                commissionValue = COMMISSIONS[values.paymenthCommissionName]
            }else{
                commissionValue = parseFloat(values.paymenthCommission).toFixed(1) || 0
            }

            await updateCommissionPaymet(data, commissionValue ,values.paymenthCommissionName, values.useBaseValue, values.baseValue)
            onUpdate()
        }
    })

    return(
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography color='inherit' component='h6' variant='h6' align='center'>CARGOS POR PAGO</Typography>
            </div>
            <div className={classes.body}>
                <form onSubmit={formik.handleSubmit} className={classes.form} autoComplete="off" >
                <Typography color='textSecondary' variant='subheading' component='p'>Selecciona el incremeto por el medio de pago seleccionado</Typography>
                <Divider className={classes.divider}/>

                <FormControl >
                    <FormLabel>Medio de pago</FormLabel>
                    <RadioGroup name="paymenthCommissionName" value={formik.values.paymenthCommissionName} onChange={formik.handleChange}>
                       <FormControlLabel value="payu" label="PayU (4,5%)" control={<Radio/>} />
                       <FormControlLabel value="paypal" label="PayPal (5,5%)" control={<Radio/>} />
                       <FormControlLabel value="other" label="Otra" control={<Radio/>} />
                    </RadioGroup>
                </FormControl>
                {
                (formik.values.paymenthCommissionName === "other") &&
                <Fragment>
                    <TextField
                        name="paymenthCommission"
                        value={formik.values.paymenthCommission}
                        onChange={formik.handleChange}
                        disabled={!(formik.values.paymenthCommissionName === 'other')}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                        type="number" 
                        label="Porcentaje" 
                        variant="outlined" 
                        fullWidth={true} />
                    </Fragment>
                }
                    
                    <Divider className={classes.divider}/>
                    <FormControlLabel
                        control={<Checkbox name="useBaseValue" checked={formik.values.useBaseValue} onChange={formik.handleChange} />}
                        label={`En base al saldo actual ($${thousandSeparator(data.balance)})`}
                    />
                    <TextField
                        label="Valor base"
                        fullWidth
                        variant="outlined"
                        disabled={formik.values.useBaseValue}
                        name="baseValue"
                        value={formik.values.baseValue}
                        onChange={formik.handleChange('baseValue')}
                        onBlur={formik.handleBlur('baseValue')}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                <Divider className={classes.divider}/>
                <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    fullWidth={true} 
                    variant="contained" 
                    color="primary">
                            Guardar
                </Button>         
                </form>
            </div>
        </Paper>
    )
}) 



export default CommissionCard