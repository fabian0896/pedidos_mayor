import React from 'react'
import { Formik, Field } from 'formik'
import MyAutocomplete from '../../../componets/myAutocomplete/MyAutocomplete';
import { Grid, TextField } from '@material-ui/core' 
import {withStyles } from '@material-ui/core/styles'
import * as Yup from 'yup'


const signupSchema = Yup.object().shape({
    country: Yup.object().required("El pais es un campo requerido!"),
    city: Yup.string().required("La ciudad es un campo requerido!"),
    zipCode: Yup.string(),
    address: Yup.string().required("la direccion es un campo requerido!")
})

const styles = theme => ({
    formContainer: {
        marginTop: `${theme.spacing.unit * 2}px`
    },
    input:{
        width: '400px',
        [theme.breakpoints.down('sm')]:{
            width: '100%'
        }
    }
})



function NewClientFormLocation(props) {
    
    const { classes} = props    
    return (
        <Formik
            onSubmit={props.handleSubmit}
            initialValues={{
                country: props.country,
                city: props.city,
                zipCode: props.zipCode,
                address: props.address
            }}
            validationSchema={signupSchema}
        >
            {
                ({
                    errors,
                    values,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    touched,
                    submitForm
                }) => {
                    props.getSubmitRef(submitForm)
                    return(
                        <form ref={props.getRef} onSubmit={handleSubmit}>
                            <Grid className={classes.formContainer} container spacing={24}>
                                <Grid item xs={12}>
                                    <Field
                                        error={errors.country && touched.country}
                                        myPlaceholder="Pais" 
                                        className={classes.input} 
                                        name="country" 
                                        component={MyAutocomplete} 
                                        optionsList={props.options} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className={classes.input}
                                        error={ (!!errors.city) && (!!touched.city)  }
                                        variant="outlined"
                                        label="Ciudad"
                                        name="city"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.city}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className={classes.input}
                                        error={ errors.zipCode && touched.zipCode }
                                        variant="outlined"
                                        label="Codigo Postal"
                                        name="zipCode"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.zipCode}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className={classes.input}
                                        error={errors.address && touched.address}
                                        variant="outlined"
                                        label="direccion"
                                        name="address"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.address}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    )}
            }
        </Formik>
    )
}

export default withStyles(styles)(NewClientFormLocation);