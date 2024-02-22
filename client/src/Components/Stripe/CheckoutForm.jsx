import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from '@stripe/react-stripe-js';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import '../../index.css';
const stripePromise = loadStripe(
    'pk_test_51OYuqDAY4XFYCSiOnDX5xG8yvIYzOslPPnyByhoZG9fWnsJaxsi3cplRtIns4iVZLAz0wNk4HpBPilztfV0C2fjP00Hdkoq1lT',
);

export default function CheckoutForm() {
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/create-checkout-session', {
            method: 'POST',
        }).then((response) => {
            if (response.ok) {
                response
                    .json()
                    .then((data) => setClientSecret(data.clientSecret));
            } else {
                response.json().then((error) => setError(error));
            }
        });
    }, []);

    if (!error) {
        return (
            <div id="checkout">
                {clientSecret && (
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={{ clientSecret }}
                    >
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                )}
            </div>
        );
    } else if (error) {
        return (
            <div>
                <h1>{error.error}</h1>
            </div>
        );
    }
}
