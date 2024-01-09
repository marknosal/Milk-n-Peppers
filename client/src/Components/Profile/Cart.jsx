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
            <Button 
                content="Delete"
                onClick={(cartId) => handleDeleteClick(cartId)}
                floated="right"
            />
        </Segment>
    ))

    function handleDeleteClick(cartId) {
        fetch(`/customs/${cartId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                handleDelete(cartId)
            } else {
                response.json().then(data => {
                    console.log(data)
                })
            }
        })
    }

    function handleDelete(deletedId) {
        const updatedCart = cart.map(c => (
            c.id === deletedId ? null : c 
        ))
        setCart(updatedCart)
    }

    return (
        <Container className="cart-container">
            <Divider horizontal>Cart</Divider>
            <SegmentGroup>
                {cartItems}
            </SegmentGroup>
        </Container>
    )
}