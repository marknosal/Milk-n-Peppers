import React, { useContext } from "react";
import "../../index.css"
import { Container, Header } from "semantic-ui-react";
import Cart from "./Cart";
import LogoutPortal from "./LogoutPortal";
import { UserContext } from "../Context/UserContext";


export default function Profile () {
    const { user } = useContext(UserContext)
    return (
        <Container className="profile-container">
            <LogoutPortal />
            <Header as='h2'>Welcome {user.name}!</Header>
            <Cart />
        </Container>
    )
}