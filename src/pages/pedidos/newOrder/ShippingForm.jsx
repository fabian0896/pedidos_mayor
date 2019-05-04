import React from 'react'
import { Formik } from 'formik'
import { withStyles, TextField, Grid } from '@material-ui/core';
import * as Yup from 'yup'


const styles = theme =>({
    form:{
        width: 450,
        padding: theme.spacing.unit*2,
        [theme.breakpoints.down('md')]:{
            width: '100%'
        }
    }
})



const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    country: Yup.string().required(),
    city: Yup.string().required(),
    address: Yup.string().required(),
    zipCode: Yup.string().required(),
    phone: Yup.string().required(),
    email: Yup.string().email().required(),
})

function ShippingForm(props){
    const { classes, handleSubmit, saveSubmitRef, iniValues, required } = props

    return(
        <Formik
            initialValues={{
                name: iniValues.name || '',
                country: iniValues.country || '',
                city: iniValues.city || '',
                address: iniValues.address || '',
                zipCode: iniValues.zipCode || '',
                phone: iniValues.phone || '',
                email: iniValues.email || ''
            }}
            onSubmit={handleSubmit}
            validationSchema={required && validationSchema}
        >
            {
                ({ 
                    handleSubmit, 
                    submitForm,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched
                })=>{
                    saveSubmitRef(submitForm)
                    return(
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={16}>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        error={errors.name && touched.name}
                                        value={values.name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        variant="outlined"
                                        name="name"
                                        label="Nombre"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                         error={errors.country && touched.country}
                                        value={values.country}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        variant="outlined"
                                        name="country"
                                        label="Pais"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                         error={errors.city && touched.city}
                                        value={values.city}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        variant="outlined"
                                        name="city"
                                        label="Ciudad"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <TextField
                                         error={errors.address && touched.address}
                                        value={values.address}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        variant="outlined"
                                        name="address"
                                        label="Dirección"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                         error={errors.zipCode && touched.zipCode}
                                        value={values.zipCode}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        variant="outlined"
                                        name="zipCode"
                                        label="Codigo Postal"
                                        fullWidth
                                    />
                                </Grid>
                                
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                         error={errors.phone && touched.phone}
                                        value={values.phone}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        variant="outlined"
                                        name="phone"
                                        label="Telefono"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <TextField
                                         error={errors.email && touched.email}
                                        value={values.email}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        variant="outlined"
                                        name="email"
                                        label="Correo Electronico"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    )
                }
            }
        </Formik>
    )
}


export default withStyles(styles)(ShippingForm)