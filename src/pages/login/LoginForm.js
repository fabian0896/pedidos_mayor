import React, {Fragment} from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';




const styles = {
    root:{
        width: '300px',
        padding: '20px'
        
    },
    formulario:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formInput:{
        width: '100%'
    },
    LoinLogo:{
        width: '300px',
        marginBottom: '30px'
    },
    title:{
        marginBottom: '20px'
    },
    submitButton:{
        width: '100%',
        margin: '20px 0 10px 0'
    },
    secundaryButtom:{
        marginBottom: '30px'
    },
    loadingWrapper:{
        position: 'relative',
        width: '100%'
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
}


function LoinForm(props) {
    
    const { register, classes } = props
    let SignUpSchema = {}

    if(register){
        SignUpSchema = Yup.object().shape({
            email: Yup.string().email('Correo invalido').required('El Correo es necesario para entrar ;)'),
            password: Yup.string().min(4, 'La contraseña es muy corta').required('La contraseña es necesaria baby ;)'),
            name: Yup.string("Valor invalido").min(5, "El nombre debe ser de minimo 5 letras"),
            code: Yup.string("el codigo no es valido")
        })
    }else{
        SignUpSchema = Yup.object().shape({
            email: Yup.string().email('Correo invalido').required('El Correo es necesario para entrar ;)'),
            password: Yup.string().min(4, 'La contraseña es muy corta').required('La contraseña es necesaria baby ;)')
        })
    }
    

    return (
        <Paper className={classes.root}>
            <Formik
                onSubmit={props.handelSubmint}
                initialValues ={{
                    email: '',
                    password: '',
                    code: '',
                    name: ''
                }}
                validationSchema={SignUpSchema}
            >
                {
                    (formProps) => {
                        const {
                            errors,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            isSubmitting,
                            handleSubmit
                        } = formProps
                        return (
                            <form className={classes.formulario} onSubmit={handleSubmit}>
                                <img className={classes.LoinLogo} src={props.logo} alt="Fajas Internacionales" />
                                <Typography 
                                    align="center"
                                    className={classes.title} 
                                    variant="title" 
                                    component="h1">
                                        Por favor ingresa con tu cuenta o crea una nueva        
                                </Typography>
                                <TextField
                                    error={errors.email && touched.email}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="email" 
                                    type="text" 
                                    id="inputEmail" 
                                    className={ classes.formInput}
                                    label="Usuario"
                                    helperText={errors.email}
                                    variant="outlined"
                                    margin="normal"
                                    autoFocus />
                                <TextField
                                    error={errors.password && touched.password}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="password"
                                    type="password" 
                                    id="inputPassword" 
                                    className={classes.formInput}
                                    helperText={errors.password}
                                    label="Contraseña" 
                                    variant="outlined"
                                    margin="normal"
                                    />
                                    {   
                                        register &&
                                        <Fragment>
                                            <TextField
                                            margin="normal"
                                            variant="outlined"
                                            helperText={errors.name}
                                            error={errors.name && touched.name}
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="name"
                                            type="text" 
                                            id="inputName" 
                                            className={classes.formInput}
                                            label="Nombre" 
                                            />
                                            <TextField
                                            margin="normal"
                                            variant="outlined"
                                            value={values.code}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="code"
                                            type="text" 
                                            id="inputCode" 
                                            className={classes.formInput}
                                            label="Codigo de registro" 
                                            />

                                        </Fragment>
                                    }
                                <div className={classes.loadingWrapper}>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        color="primary" 
                                        disabled={isSubmitting} 
                                        className={classes.submitButton}
                                        type="submit">
                                        { register? 'Registrarme!' : 'Ingresar'}     
                                    </Button>
                                    {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </div>
                                <Button
                                    size="small" 
                                    color="primary"
                                    onClick={props.handleChangeRegister} 
                                    type="button" 
                                    className={ classes.secundaryButtom }>
                                        {register? 'Ya tengo cuenta' :'Crear Cuenta' }
                                </Button>
                                <Typography color="textSecondary" component="p" variant="subtitle2">&copy; Fajas Internacionales By Bethel</Typography>
                            </form>
                        )
                    }
                }
            </Formik>
        </Paper>
    )
}

export default withStyles(styles)(LoinForm);