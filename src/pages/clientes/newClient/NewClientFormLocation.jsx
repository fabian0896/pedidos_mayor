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
        margin: `${theme.spacing.unit * 2}px 0`
    }
})



function NewClientFormLocation(props) {
    
    const { classes } = props
    
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
                                <Grid item sm={12}>
                                    <Field name="country" component={MyAutocomplete} optionsList={props.options} />
                                </Grid>
                                <Grid item sm={12}>
                                    <TextField
                                        error={ (!!errors.city) && (!!touched.city)  }
                                        variant="outlined"
                                        label="Ciudad"
                                        name="city"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.city}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <TextField
                                        error={ errors.zipCode && touched.zipCode }
                                        variant="outlined"
                                        label="Codigo Postal"
                                        name="zipCode"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.zipCode}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <TextField
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