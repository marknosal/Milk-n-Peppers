import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Error from "../Error";
import { UserContext } from "../Context/UserContext";

export default function SignupForm () {
    const [error, setError] = useState(null)
    const { login } = useContext(UserContext)

    const signupSchema = yup.object().shape({
        username: yup.string()
                        .min(6)
                        .required('Must exist'),
        name: yup.string()
                        .min(3)
                        .required('Must exist'),
        email: yup.string()
                        .email('Invalid email')
                        .required('Must exist'),
        password: yup.string()
                        .min(8)
                        .required('Must exist'),
        passwordConfirm: yup.string()
                        .oneOf([yup.ref('password'), null], 'Passwords must match')
                        .required('Must exist'),
    })
    const formik = useFormik({
        initialValues: {
            username: '',
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema: signupSchema,
        onSubmit: values => {
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        login(data)
                        setError(null)
                    })
                } else {
                    response.json().then(data => {
                        setError(data)
                    })
                }
            })
        }
    })

    return (
        <div classname='signup-form'>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input
                        type = 'text'
                        id = 'username'
                        name = 'username'
                        onChange = {formik.handleChange}
                        value = {formik.values.username}
                    />
                    <p>{formik.errors.username}</p>
                </div>
                <div>
                    <label htmlFor='name'>Name: </label>
                    <input
                        type = 'text'
                        id = 'name'
                        name = 'name'
                        onChange = {formik.handleChange}
                        value = {formik.values.name}
                    />
                    <p>{formik.errors.name}</p>
                </div>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input
                        type = 'text'
                        id = 'email'
                        name = 'email'
                        onChange = {formik.handleChange}
                        value = {formik.values.email}
                    />
                    <p>{formik.errors.email}</p>
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input
                        type = 'password'
                        id = 'password'
                        name = 'password'
                        autoComplete='new-password'
                        onChange = {formik.handleChange}
                        value = {formik.values.password}
                    />
                    <p>{formik.errors.password}</p>
                </div>
                <div>
                    <label htmlFor='passwordConfirm'>Confirm Password: </label>
                    <input
                        type = 'password'
                        id = 'passwordConfirm'
                        name = 'passwordConfirm'
                        autoComplete = 'new-password'
                        onChange = {formik.values.passwordConfirm}
                    />
                    <p>{formik.errors.passwordConfirm}</p>
                </div>
                <button type='submit'>Sign Up</button>
            </form>
            <Error error={error} />
        </div>
    )
}