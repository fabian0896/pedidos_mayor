import React from 'react'
import { Formik } from 'formik'
import { withStyles, TextField, Grid } from '@material-ui/core';



const styles = theme =>({
    form:{
        width: 450,
        padding: theme.spacing.unit*2,
        [theme.breakpoints.down('md')]:{
            width: '100%'
        }
    }
})


function ShippingForm(props){
    const { classes, handleSubmit, saveSubmitRef, iniValues } = props

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
        >
            {
                ({ 
                    handleSubmit, 
                    submitForm,
                    handleChange,
                    handleBlur,
                    values 
                })=>{
                    saveSubmitRef(submitForm)
                    return(
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={16}>
                                <Grid item xs={12} md={12}>
                                    <TextField
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