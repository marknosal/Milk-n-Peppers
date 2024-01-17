import React, { useState, useEffect } from "react";
import { Container, Message, Header, Icon } from 'semantic-ui-react';
import { /*BrowserRouter as Router, Route, Routes,*/ Navigate } from 'react-router-dom';

export default function Return () {
    const [status, setStatus] = useState(null)
    const [customerEmail, setCustomerEmail] = useState('')
    const [priceIds, setPriceIds] = useState([])

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        fetch(`/session-status?session_id=${sessionId}`)
            .then(response => response.json())
                .then(data => {
                    setStatus(data.status)
                    setCustomerEmail(data.customer_email)
                    setPriceIds(data.priceIds)
                });
    }, []);

    if (status === 'open') {
        return (
            <Navigate to='/checkout' />
        )
    }

    if (status === 'complete') {

        return (
            <Container text style={{ marginTop: '2em', textAlign: 'center' }}>
                <Message success color='orange' icon>
                    <Icon name='check circle' size='big' color='green' />
                    <Message.Content>
                        <Header as='h2' color='orange'>
                            Thank you for your purchase!
                        </Header>
                        <p>
                            A confirmation email will be sent to {customerEmail}.
                        </p>
                        <p>
                            If you have any questions, please email{' '}
                            <a href='mailto:milknpeppers@gmail.com'>milknpeppers@gmail.com</a>.
                        </p>
                    </Message.Content>
                </Message>
            </Container>
        );
    }

    return null;
}