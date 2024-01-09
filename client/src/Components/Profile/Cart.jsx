import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Segment, SegmentGroup } from "semantic-ui-react";
// import { UserContext } from "../Context/UserContext";

export default function Cart () {
    // const { user } = useContext(UserContext)
    const [cart, setCart] = useState([])

    useEffect(() =>  {
        fetch('/customs')
            .then(response => response.json())
                .then(data => setCart(data))
    }, [])

    const cartItems = cart.map(c => (
        <Segment key={c.id}>
            {c.clothing.name}
            <Button floated="right">X</Button>
        </Segment>
    ))

    return (
        <Container className="cart-container">
            <Divider horizontal>Cart</Divider>
            <SegmentGroup>
                {cartItems}
            </SegmentGroup>
        </Container>
    )
}