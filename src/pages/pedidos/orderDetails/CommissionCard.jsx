import React, {Fragment} from 'react'
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
    Button
} from '@material-ui/core'
import { useState } from 'react'
import {updateCommissionPaymet} from '../../../lib/firebaseService'
import {COMMISSIONS} from '../../../lib/enviroment'

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

    const [value, setValue] = useState(()=>data.paymethCommissionName)
    const [textValue, setTextValue] = useState(()=> data.paymethCommissionName !== 'other'? '' : data.paymenthCommission )
    const [loading, setLoading] = useState(false)

    const handleChange = (event)=>{
        const selected = event.target.value

        if(selected !== 'other')
            resetTextValue()

        setValue(selected)
    }

    const handleTextChange = (event)=>{
        const text = event.target.value
        setTextValue(text)
    }

    const resetTextValue = ()=>{
        setTextValue('')
    }

    const handleSave = async ()=>{
        setLoading(true)
        let commissionValue = 0
        if(value !== 'other'){
            commissionValue = COMMISSIONS[value] || 0
        } else{
            const numberCommisionValue = parseFloat(textValue).toFixed(1) || 0
            commissionValue = numberCommisionValue
        }
        console.log('Se van a gaurdar los datos')
        await updateCommissionPaymet(data, commissionValue, value)
        onUpdate()
        console.log('Se Guardaron')
        setLoading(false)
    }

    return(
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography color='inherit' component='h6' variant='h6' align='center'>CARGOS POR PAGO</Typography>
            </div>
            <div className={classes.body}>
                <Typography color='textSecondary' variant='subheading' component='p'>Selecciona el incremeto por el medio de pago seleccionado</Typography>
                <Divider className={classes.divider}/>

                <FormControl >
                    <FormLabel>Medio de pago</FormLabel>
                    <RadioGroup name="paymentMethod" value={value} onChange={handleChange}>
                       <FormControlLabel value="payu" label="PayU (4,5%)" control={<Radio/>} />
                       <FormControlLabel value="paypal" label="PayPal (5,5%)" control={<Radio/>} />
                       <FormControlLabel value="other" label="Otra" control={<Radio/>} />
                    </RadioGroup>
                </FormControl>
                <form className={classes.form} autoComplete="off" >
                    <TextField
                        value={textValue}
                        onChange={handleTextChange}
                        disabled={!(value === 'other')}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                        type="number" 
                        label="Porcentaje" 
                        variant="outlined" 
                        fullWidth={true} />
                </form>
                <Divider className={classes.divider}/>
                <Button
                    disabled={loading}
                    onClick={handleSave}
                    fullWidth={true} 
                    variant="contained" 
                    color="primary">
                            Guardar
                </Button>         
            </div>
        </Paper>
    )
}) 



export default CommissionCard