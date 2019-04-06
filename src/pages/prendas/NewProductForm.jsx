import React from 'react'
import { Formik } from 'formik'
import { 
    TextField, 
    Button, 
    withStyles, 
    Grid,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio
 } from '@material-ui/core'

const styles = theme => ({
    saveButton:{
        marginTop: theme.spacing.unit*2
    }
})

class NewProductForm extends React.Component{
    
    state={
        value: 'old'
    }

    handleChange = (event, value)=>{
        this.setState({value})
    }

    render(){
        const { classes } = this.props
        return(
        <Formik>
            {
                ({
                    errors,
                    handleChange,
                    handleBlur,
                    values,
                    handleSubmit
                })=>(
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Nombre"
                                    variant="outlined"
                                    fullWidth   
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Referencia"
                                    variant="outlined"
                                    fullWidth   
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    label="Precio(COP)"
                                    variant="outlined"
                                    fullWidth   
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    label="Precio(USD)"
                                    variant="outlined"
                                    fullWidth  
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl >
                                    <RadioGroup
                                     row
                                     value={this.state.value}
                                     onChange={this.handleChange}>
                                        <FormControlLabel value="old" control={<Radio/>} label="Linea Existente" />
                                        <FormControlLabel value="new" control={<Radio/>} label="Nueva Linea" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Linea"
                                    variant="outlined"
                                    fullWidth  
                                />
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
                                    fullWidth 
                                    color="primary" 
                                    variant="contained"
                                    size="large">
                                        Guardar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            }
        </Formik>
    )}
}


export default withStyles(styles)(NewProductForm)