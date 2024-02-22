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

export default function NewBlogPortal({ open, onSave, onCancel }) {
    const mySchema = yup.object().shape({
        title: yup.string().min(5, 'Too short').required('You need a title.'),
        body: yup
            .string()
            .min(50, 'Too short')
            .required('You need a body for a blog.'),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            body: '',
        },
        validationSchema: mySchema,
        onSubmit: (values) => {
            console.log(values);
            fetch('/blogs', {
                method: 'POST',
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
                        <Label htmlFor="title" color="orange">
                            Title:
                        </Label>
                        <TextArea
                            style={{
                                width: '100%',
                                resize: 'none',
                                overflowY: 'auto',
                            }}
                            placeholder="Blog Title..."
                            type="text"
                            id="title"
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                        />
                        <p>{formik.errors.title}</p>
                    </div>
                    <div>
                        <Label htmlFor="body" color="orange">
                            Body:
                        </Label>
                        <TextArea
                            style={{
                                width: '100%',
                                resize: 'none',
                                overflowY: 'auto',
                            }}
                            placeholder="Blog Body..."
                            type="text"
                            id="body"
                            name="body"
                            onChange={formik.handleChange}
                            value={formik.values.body}
                        />
                        <p>{formik.errors.body}</p>
                    </div>
                    <Button content="Save" color="green" type="submit" />
                    <Button content="Cancel" color="red" onClick={onCancel} />
                </Form>
            </Segment>
        </Portal>
    );
}
