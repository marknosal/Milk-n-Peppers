import React from "react";
import Logout from "./Logout";
import "../../index.css"

import { Container } from "semantic-ui-react";
import Cart from "./Cart/Cart";

export default function Profile () {
    return (
        <Container className="profile-container">
            <Logout />
            Profile
            <Cart />
        </Container>
    )
}