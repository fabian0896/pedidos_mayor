import React from 'react'
import { withFormik } from 'formik'
import { Typography, TextField, withStyles, Divider } from '@material-ui/core'
import NumberFormat from 'react-number-format';


const styles = theme => ({
    form: {
        width: 450,
        marginTop: theme.spacing.unit * 2,
    },
    info: {
        //marginBottom: theme.spacing.unit*2
    },
    divider: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    }
})


class DescountForm extends React.Component {

    myHandleChange = (event) => {
        const { handleChange, setFieldValue, values } = this.props
        handleChange(event)
        const descount = event.target.value
        const percent = (parseFloat(descount) / 100)
        const total = values.subTotal - (values.subTotal * percent)
        setFieldValue('total', total )
    }

    componentDidMount(){
        const { saveSubmitRef, submitForm } = this.props
        saveSubmitRef(submitForm)
    }

    render() {
        const { handleSubmit, values, handleBlur, classes } = this.props
        return (
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    className={classes.info}
                    type="number"
                    label="Descuento(%)"
                    variant="outlined"
                    name="descount"
                    onChange={this.myHandleChange}
                    onBlur={handleBlur}
                    value={values.descount}
                    margin="normal"
                />
                <Divider className={classes.divider} />
                <div className={classes.info}>
                    <Typography color="textSecondary" variant="subtitle1" >Sub Total</Typography>
                    <NumberFormat
                        value={values.subTotal}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        renderText={value => (
                            <Typography gutterBottom variant="h5">{value}</Typography>
                        )} />

                    <Typography color="textSecondary" variant="subtitle1" >Descuento</Typography>
                    <Typography variant="h5" >{`${values.descount || 0}%`}</Typography>
                    <NumberFormat
                        value={(values.descount/100)*values.subTotal}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'-$'}
                        renderText={value => (
                            <Typography gutterBottom variant="overline">{value}</Typography>
                        )} />

                    <Typography color="textSecondary" variant="subtitle1" >Total</Typography>
                    <NumberFormat
                        value={values.total || values.subTotal}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        renderText={value => (
                            <Typography gutterBottom variant="h5">{value}</Typography>
                        )} />
                </div>
            </form>
        )
    }
}



DescountForm = withFormik({
    mapPropsToValues: (props) => { 
        const subTotal = props.initialValues.products
                                    .map(({quantity, price})=> parseInt(quantity)*parseFloat(price))
                                    .reduce((prev,curr)=> prev + curr)
        const total = props.initialValues.descount? subTotal - (subTotal*( props.initialValues.descount/100)) : subTotal
        return{
            descount: props.initialValues.descount || 0,
            total,
            subTotal
        }
    },
    handleSubmit: (values, actions) => {
        actions.props.handleSubmit(values,actions)
    }
})(DescountForm)


export default withStyles(styles)(DescountForm)