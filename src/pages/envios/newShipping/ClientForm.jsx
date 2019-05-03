import React, { useEffect } from 'react'
import { withFormik, Field } from 'formik'
import { 
    Grid, 
    FormControl, 
    FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio, 
    Typography,
    Divider
} from '@material-ui/core'
import MyAutocomplete from '../../../componets/myAutocomplete/MyAutocomplete'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles(theme => ({
    form: {
        width: 450
    },
    input: {

    },
    divider:{
        marginTop: 16,
        marginBottom: 16
    },
    orderInfo:{
        marginTop: 16,
        display: 'flex',
        alignItems: 'center',
        '& > :first-child':{
            flex: 1,
            paddingRight: 8
        }
    }
}))




function ClientForm(props) {

    const classes = useStyles()

    const {
        handleSubmit,
        errors,
        values,
        touched,
        isEditing,
        options,
        handleChange,
        handleBlur,
        submitForm
    } = props

    useEffect(()=>{
        props.getSubmitRef(submitForm)

    }, [props.getSubmitRef])

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={24}>
                <Grid item md={12}>
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
                    <div className={classes.orderInfo}>
                        <div>
                            <Typography variant="h6">{values.order.secondary}</Typography>
                            <Typography color="textSecondary" variant="body1">{`${values.order.city}, ${values.order.country}`}</Typography>
                        </div>
                         <Typography variant="h5">{values.order.label}</Typography>
                    </div>
                    <Divider className={classes.divider}/>
                    <Typography color="textSecondary" variant="subtitle1">Prendas pendientes por despacho:</Typography>
                    <Typography variant="h6">{values.order.pendingProducts}</Typography>
                </Grid>
                }

                <Grid item xs={12}>
                    <FormControl
                        component="fieldset"
                        error={errors.paymentMethod && touched.paymentMethod}
                    >
                        <FormLabel component="legend">Modo de Pago</FormLabel>
                        <RadioGroup
                            aria-label="paymentMethod"
                            name="paymentMethod"
                            value={values.paymentMethod}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <FormControlLabel value="payHere" control={<Radio />} label="Agregar valor al pedido" />
                            <FormControlLabel value="payThere" control={<Radio />} label="Paga al recibir" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    )
}



export default withFormik({
    mapPropsToValues: props => ({
        order: props.initialvalues.order || null,
        paymentMethod: props.initialvalues.paymentMethod || ''
    }),
    handleSubmit: (values, actions) => {
        actions.props.handleSubmit(values, actions)
    }
})(ClientForm)