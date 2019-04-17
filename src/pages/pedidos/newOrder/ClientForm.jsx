import React from 'react'
import { Formik, Field } from 'formik'
import { withStyles } from '@material-ui/core';
import MyAutocomplete from '../../../componets/myAutocomplete/MyAutocomplete'

const styles = theme =>({
    form:{
        width: '420px',
        padding: theme.spacing.unit*2
    },
    input:{

    }
})



function ClientForm(props){
    const { classes } = props
    return(
        <Formik
            initialValues={{
                client: null
            }}
        >
            {
                ({})=>{

                    return(
                        <form className={classes.form}>
                            <Field
                                myPlaceholder="Cliente" 
                                className={classes.input} 
                                name="client" 
                                component={MyAutocomplete} 
                                optionsList={props.options} />
                        </form>
                    )
                }
            }
        </Formik>
    )
}


export default withStyles(styles)(ClientForm)