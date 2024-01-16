import React from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
import { Portal, Segment/*, Button, Form, Label, TextArea*/ } from "semantic-ui-react";
import "../../index.css"
import CheckoutForm from "../Stripe/CheckoutForm";

export default function CheckoutPortal({ open, onSave, onCancel, custom }) {

    // const mySchema = yup.object().shape({
    //     notes: yup.string().required('Must exist').min(1),
    // })

    // const formik = useFormik({
    //     initialValues: {
    //         notes: '',
    //     },
    //     validationSchema: mySchema,
    //     onSubmit: (values) => {
    //         console.log('in submit')
    //         fetch(`/customs/${custom.id}`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(values)
    //         }).then(response => {
    //                 if (response.ok) {
    //                     response.json().then(data => {
    //                         onSave(data)
    //                         formik.resetForm()
    //                     })
    //                 } else {
    //                     response.json().then(data => {
    //                         console.log(data)
    //                     })
    //                 }
    //             })
    //     }
    // })

    return (
        <Portal open={open}>
            <Segment style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} color="orange">
                <CheckoutForm />
            </Segment>
        </Portal>
    );
}