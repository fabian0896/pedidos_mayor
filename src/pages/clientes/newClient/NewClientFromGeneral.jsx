import React from 'react'
import { Formik } from 'formik'
import { Grid, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import * as Yup from 'yup'


const signupSchema = Yup.object().shape({
    name: Yup.string().required("El pais es un campo requerido!"),
    email: Yup.string().email("Email no valido"),
    phone: Yup.string().required("El telefono es requerido!"),
    currency: Yup.string().required('Valor requerido'),
    label: Yup.string().required(),
    mold: Yup.string().required()
})

const styles = theme => ({
    formContainer: {
        marginTop: `${theme.spacing.unit * 2}px`,
        width: 410,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    input: {
        width: '400px',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    }
})



function NewClientFormGeneral(props) {
    const { classes } = props
    return (
        <Formik
            onSubmit={props.handleSubmit}
            initialValues={{
                name: props.name,
                email: props.email,
                phone: props.phone,
                currency: null,
                label: 'generic',
                mold: 'new'
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
                    return (
                        <form onSubmit={handleSubmit}>
                            <Grid className={classes.formContainer} container spacing={24}>
                                <Grid item xs={12}>
                                    <TextField
                                        className={classes.input}
                                        error={(!!errors.name) && (!!touched.name)}
                                        variant="outlined"
                                        label="Nombre"
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className={classes.input}
                                        error={errors.phone && touched.phone}
                                        variant="outlined"
                                        label="Telefono"
                                        name="phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.phone}
                                    />
                                </Grid>
                                <Grid item xs={12}>
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
                                <Grid item xs={6}>
                                    <FormControl
                                        component="fieldset"
                                        error={errors.currency && touched.currency}
                                    >
                                        <FormLabel component="legend">Moneda</FormLabel>
                                        <RadioGroup
                                            aria-label="Gender"
                                            name="currency"
                                            value={values.currency}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <FormControlLabel value="USD" control={<Radio />} label="Dolares" />
                                            <FormControlLabel value="COP" control={<Radio />} label="Pesos Colombianos" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl
                                        component="fieldset"
                                        error={errors.label && touched.label}
                                    >
                                        <FormLabel component="legend">Marquilla</FormLabel>
                                        <RadioGroup
                                            aria-label="Label"
                                            name="label"
                                            value={values.label}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <FormControlLabel value="custom" control={<Radio />} label="Perzonalizada" />
                                            <FormControlLabel value="generic" control={<Radio />} label="Generíca" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl
                                        component="fieldset"
                                        error={errors.mold && touched.mold}
                                    >
                                        <FormLabel component="legend">Molde</FormLabel>
                                        <RadioGroup
                                            aria-label="Mold"
                                            name="mold"
                                            value={values.mold}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <FormControlLabel value="new" control={<Radio />} label="Molde Nuevo" />
                                            <FormControlLabel value="old" control={<Radio />} label="Molde Viejo" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </form>
                    )
                }
            }
        </Formik>
    )
}

export default withStyles(styles)(NewClientFormGeneral);