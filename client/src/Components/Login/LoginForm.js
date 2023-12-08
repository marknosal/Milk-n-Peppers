import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

export default function LoginForm () {

    const valSchema = yup.object().shape({
        username: yup.string().required('Must exist'),
        password: yup.string().required('Must exist'),
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: valSchema,
        onSubmit: values => {
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            }).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        // login user
                    })
                }
            })
        }
    })

    return (
        <div className="login-form">
            <h1>Login Form</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
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
                    <label htmlFor="password">Password: </label>
                    <input
                        type = 'text'
                        id = 'password'
                        name = 'password'
                        onChange = {formik.handleChange}
                        value = {formik.values.password}
                    />
                    <p>{formik.errors.password}</p>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}