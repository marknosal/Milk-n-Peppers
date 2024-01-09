import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Portal, Segment, Button, Form, Input } from "semantic-ui-react";

export default function CustomizationPortal({ open, onSave, onCancel, custom }) {

    const mySchema = yup.object().shape({
        notes: yup.string().required('Must exist').min(1),
    })
    console.log(custom)

    const formik = useFormik({
        initialValues: {
            notes: '',
        },
        validationSchema: mySchema,
        onSubmit: (values) => {
            fetch('/customs/')
        }
    })
    console.log(1)

    return (
        <Portal open={open}>
            <Segment style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Form>
                    <Form.Field>
                        <label>Customization:</label>
                        <Input placeholder="Type something..." />
                    </Form.Field>
                    <Button content="Save" color="green" onClick={onSave} />
                    <Button content="Cancel" color="red" onClick={onCancel} />
                </Form>
            </Segment>
        </Portal>
    );
}