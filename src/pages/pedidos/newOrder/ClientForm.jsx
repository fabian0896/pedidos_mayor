import React from 'react'
import { Formik, Field } from 'formik'
import { withStyles } from '@material-ui/core';
import MyAutocomplete from '../../../componets/myAutocomplete/MyAutocomplete'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import * as Yup from 'yup'



const styles = theme => ({
    form: {
        width: '450px',
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.down('md')]:{
            width: '100%'
        }
    },
    input: {
        marginBottom: theme.spacing.unit*3
    }
})


const validationSchema = Yup.object().shape({
    client: Yup.object().required('valor requerido'),
    currency: Yup.string().required('valor requerido')
})

const customChange = (setFieldValue, clients)=> (option) =>{
    if(option){
        const currency = clients[option.value].currency || 'USD'
        setFieldValue('currency', currency)
        return
    }
    setFieldValue('currency', null)
}

function ClientForm(props) {
    const { classes, saveSubmitRef, handleSubmit, iniValues, clients } = props
    return (
        <Formik
            initialValues={{
                client: iniValues.client || null,
                currency: iniValues.currency || null
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {
                ({ submitForm, handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue }) => {
                    saveSubmitRef(submitForm)
                    return (
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <Field
                                onChange={customChange(setFieldValue, clients)}
                                error={errors.client && touched.client}
                                myPlaceholder="Cliente"
                                className={classes.input}
                                name="client"
                                component={MyAutocomplete}
                                optionsList={props.options} />
                            {
                                values.currency &&
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
                            }
                        </form>
                    )
                }
            }
        </Formik>
    )
}


export default withStyles(styles)(ClientForm)