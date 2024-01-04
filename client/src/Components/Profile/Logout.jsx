import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Button, Container } from "semantic-ui-react";
import "../../index.css"

export default function Logout () {
    const { logout } = useContext(UserContext)
    return (
        <Container className="logout-button">
            <Button onClick={logout}>Logout</Button>
        </Container>
    )
}