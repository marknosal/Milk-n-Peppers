import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    Portal,
    Segment,
    Button,
    Form,
    Label,
    TextArea,
} from 'semantic-ui-react';
import '../../index.css';

export default function CustomizationPortal({
    open,
    onSave,
    onCancel,
    custom,
}) {
    const mySchema = yup.object().shape({
        notes: yup.string().required('Must exist').min(1),
    });

    const formik = useFormik({
        initialValues: {
            notes: '',
        },
        validationSchema: mySchema,
        onSubmit: (values) => {
            fetch(`/customs/${custom.id}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        onSave(data);
                        formik.resetForm();
                    });
                } else {
                    response.json().then((data) => {
                        console.log(data);
                    });
                }
            });
        },
    });

    return (
        <Portal open={open}>
            <Segment
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                color="orange"
            >
                <Form
                    style={{ width: '300px', height: '300px' }}
                    onSubmit={formik.handleSubmit}
                >
                    <div>
                        <Label htmlFor="notes" color="orange">
                            Notes:
                        </Label>
                        <TextArea
                            style={{
                                width: '100%',
                                resize: 'none',
                                overflowY: 'auto',
                            }}
                            placeholder="Please reach out if you would like an alteration quote @ milknpeppers@gmail.com"
                            type="text"
                            id="notes"
                            name="notes"
                            onChange={formik.handleChange}
                            value={formik.values.notes}
                        />
                        <p>{formik.errors.notes}</p>
                    </div>
                    <Button content="Save" color="green" type="submit" />
                    <Button content="Cancel" color="red" onClick={onCancel} />
                </Form>
            </Segment>
        </Portal>
    );
}
