import React from 'react';
import App from './Components/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './Components/Context/UserContext';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Router>
        <UserProvider>
            <App />
        </UserProvider>
    </Router>,
);
