import React from 'react'
import { Formik } from 'formik'
import { Grid, TextField } from '@material-ui/core' 
import {withStyles } from '@material-ui/core/styles'
import * as Yup from 'yup'


const signupSchema = Yup.object().shape({
    name: Yup.string().required("El pais es un campo requerido!"),
    email: Yup.string().email("Email no valido"),
    phone: Yup.string().required("El telefono es requerido!"),
})

const styles = theme => ({
    formContainer: {
        margin: `${theme.spacing.unit * 2}px 0`
    },
    input:{
        width: '350px'
    }
})



function NewClientFormGeneral(props) {
    
    const { classes, initialValues } = props
    const { name, email, phone } = initialValues 
    return (
        <Formik
            onSubmit={props.handleSubmit}
            initialValues={{
                name,
                email,
                phone
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
                        <form onSubmit={handleSubmit}>
                            <Grid className={classes.formContainer} container spacing={24}>
                                <Grid item sm={12}>
                                    <TextField
                                        className={classes.input}
                                        error={ (!!errors.name) && (!!touched.name)  }
                                        variant="outlined"
                                        label="Nombre"
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <TextField
                                        className={classes.input}
                                        error={ errors.phone && touched.phone }
                                        variant="outlined"
                                        label="Telefono"
                                        name="phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.phone}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <TextField
                                        className={classes.input}
                                        error={errors.email && touched.email}
                                        variant="outlined"
                                        label="Correo electronico"
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    )}
            }
        </Formik>
    )
}

export default withStyles(styles)(NewClientFormGeneral);