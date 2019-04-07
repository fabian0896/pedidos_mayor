import React from 'react'
import { Formik, Field } from 'formik'
import { 
    TextField, 
    Button, 
    withStyles, 
    Grid,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputAdornment
 } from '@material-ui/core'
 import * as Yup from 'yup'
 import NumberFormat from 'react-number-format';
 import MyAutocomplete from '../../componets/myAutocomplete/MyAutocomplete'


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










const styles = theme => ({
    saveButton:{
        marginTop: theme.spacing.unit*2
    }
})

class NewProductForm extends React.Component{
    render(){
        const { classes, handleSubmit, linesOptions } = this.props


        const validationSchema = Yup.object().shape({
            name: Yup.string("Valor invalido").required("Este valor es necesario"),
            reference: Yup.string("VAlor invalido").required("Este valor es necesario"),
            cop: Yup.string("Valor invalido"),
            usd: Yup.string("Valor invalido"),
            line: Yup.string("Valor invalido").required("este valor es necesario"),
        })

        return(
        <Formik
            validationSchema={validationSchema}
            initialValues={{
                name: '',
                reference: '',
                cop: '',
                usd: '',
                value: 'old',
                line: ''
            }}
            onSubmit={handleSubmit}
        >
            {
                ({
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    values,
                    handleSubmit,
                })=>{

                    return(
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    error={ (!!errors.name) && (!!touched.name)  } 
                                    label="Nombre"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}   
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="reference"
                                    error={ (!!errors.reference) && (!!touched.reference)  } 
                                    label="Referencia"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.reference}    
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="cop"
                                    error={ (!!errors.cop) && (!!touched.cop)  } 
                                    label="Precio(COP)"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.cop}
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                        onChange: handleChange('cop'),
                                        onBlur: handleBlur('cop')
                                    }}   
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="usd"
                                    error={ (!!errors.usd) && (!!touched.usd)  } 
                                    label="Precio(USD)"
                                    variant="outlined"
                                    fullWidth
                                    value={values.usd}
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                        onChange: handleChange('usd'),
                                        onBlur: handleBlur('usd')
                                    }}   
                                />
                            </Grid>
                            <Grid item xs={12}>
                            {
                                values.value === 'old'?
                                <Field
                                    error={ (!!errors.line) && (!!touched.line)  } 
                                    myPlaceholder="Linea"
                                    className={classes.input} 
                                    name="line" 
                                    component={MyAutocomplete} 
                                    optionsList={linesOptions} />
                                    :
                                    <TextField
                                        name='line'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.line || ''} 
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Linea</InputAdornment>,
                                        }}  
                                    />
                            }
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl >
                                    <RadioGroup
                                     name="value"
                                     row
                                     value={values.value}
                                     onBlur={handleBlur}
                                     onChange={handleChange}>
                                        <FormControlLabel disabled={!!values.line} value="old" control={<Radio color="primary"/>} label="Linea Existente" />
                                        <FormControlLabel disabled={!!values.line} value="new" control={<Radio color="primary"/>} label="Nueva Linea" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth 
                                    color="secondary" 
                                    size="large">
                                        Cancelar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    fullWidth 
                                    color="primary" 
                                    variant="contained"
                                    size="large">
                                        Guardar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            }
        </Formik>
    )}
}


export default withStyles(styles)(NewProductForm)