import React from 'react';
import '../../index.css';
import { Container, Divider, Header } from 'semantic-ui-react';

export default function TopBanner({ title }) {
    return (
        <Container className="top-container">
            <Header className="top-container-header" as="h1" textAlign="center">
                {title}
            </Header>
            <Divider className="top-divider" />
        </Container>
    );
}
