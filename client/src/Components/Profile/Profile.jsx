import React from "react";
import "../../index.css"
import { Container, Header } from "semantic-ui-react";
import Cart from "./Cart/Cart";
import LogoutPortal from "./LogoutPortal";


export default function Profile () {
    return (
        <Container className="profile-container">
            <LogoutPortal />
            <Header as='h2'>Profile</Header>
            <Cart />
        </Container>
    )
}