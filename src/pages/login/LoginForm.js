import React, {Fragment} from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import './Login.css';


const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Correo invalido').required('El Correo es necesario para entrar ;)'),
    password: Yup.string().min(4, 'La contraseña es muy corta').required('La contraseña es necesaria baby ;)')
})


function LoinForm(props) {
    
    const { register } = props

    return (
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
                        <form className="form-signin" onSubmit={handleSubmit}>
                        <div>

                        </div>
                            <img className="Login-logo mb-4" src={props.logo} alt="Fajas Internacionales" />
                            <h1 className="h5 mb-3 font-weight-normal">Por favor ingresa con tu cuenta</h1>
                            <label htmlFor="inputEmail" className="sr-only">Email address</label>
                            <input
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="email" 
                                type="text" 
                                id="inputEmail" 
                                className={`form-control ${ errors.email && touched.email &&'is-invalid'} ${ !(errors.email && touched.email) && 'is-valid'}`}
                                placeholder="Correo electronico" 
                                autoFocus />
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="password"
                                type="password" 
                                id="inputPassword" 
                                className={`form-control ${ errors.password && touched.password &&'is-invalid' }`}
                                placeholder="Contraseña" 
                                />
                                {   
                                    register &&
                                    <Fragment>
                                        <input
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="name"
                                        type="text" 
                                        id="inputName" 
                                        className={`form-control`}
                                        placeholder="Nombre" 
                                        />
                                        <input
                                        value={values.code}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="code"
                                        type="text" 
                                        id="inputCode" 
                                        className={`form-control mb-2`}
                                        placeholder="Codigo de registro" 
                                        />

                                    </Fragment>
                                }
                            
                            <button 
                                disabled={isSubmitting} 
                                className="btn btn-lg btn-primary btn-block mt-4" 
                                type="submit">
                                {
                                    isSubmitting?
                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    :
                                    <span>{register? 'Registrarme' : 'Ingresar' }</span>
                                }
                                    
                            </button>
                            <button 
                                onClick={props.handleChangeRegister} 
                                type="button" className="btn btn-link mb-3">
                                    {register? 'Ya tengo cuenta' :'Crear Cuenta' }
                            </button>
                            <p className="mt-5 mb-3 text-muted">&copy; Fajas Internacionales By Bethel</p>
                        </form>
                    )
                }
            }
        </Formik>
    )
}

export default LoinForm;