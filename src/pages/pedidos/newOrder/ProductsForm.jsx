import React from 'react';
import { Formik, Field } from 'formik'
import { selectSearch } from '../../../lib/searchService'
import MyAsyncAutomoplete from '../../../componets/myAutocomplete/MyAsyncAutocomplete'
import { withStyles, Grid, TextField } from '@material-ui/core';

const styles = theme =>({
    input:{

    },
    form:{
        width: 450,
        padding: theme.spacing.unit*2
    }
})

function ProductForm(props){
    const { classes } = props
    return(
        <Formik
            initialValues={{
                product: null,
                size: null,
                color: 'Negro',
                quantity: 0,
                value: 0
            }}
        >
            {
                ({handleSubmit})=>{

                    return(
                        <form className={classes.form} onSubmit={handleSubmit}>
                           <Grid container spacing={16}>
                                <Grid item md={12}>
                                    <Field
                                        myPlaceholder="Prenda" 
                                        className={classes.input} 
                                        name="product" 
                                        component={MyAsyncAutomoplete} 
                                        promiseOptions={selectSearch} />
                                </Grid>
                                
                                <Grid item md={3}>
                                    <TextField
                                        fullWidth
                                        label="talla"
                                        variant='outlined'
                                    />
                                </Grid>

                                <Grid item md={3}>
                                    <TextField
                                            fullWidth
                                            label="Color"
                                            variant='outlined'
                                        />
                                </Grid>

                                <Grid item md={3}>
                                    <TextField
                                            fullWidth
                                            label="Cantidad"
                                            variant='outlined'
                                        />
                                </Grid>

                                <Grid item md={3}>
                                    <TextField
                                            fullWidth
                                            label="Valor"
                                            variant='outlined'
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


export default withStyles(styles)(ProductForm)