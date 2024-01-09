import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Segment, SegmentGroup, Image } from "semantic-ui-react";
// import { UserContext } from "../Context/UserContext";

export default function Cart () {
    // const { user } = useContext(UserContext)
    const [cart, setCart] = useState([])

    useEffect(() =>  {
        fetch('/customs')
            .then(response => response.json())
                .then(data => setCart(data))
    }, [])

    const cartItems = Array.isArray(cart) && cart.length > 0 ? (
        cart.map(c => (
            <Segment key={c.id} color="orange" size="massive" style={{color: 'orange'}}>
                {c.clothing.name}
                <Image 
                    src={'/' + c.clothing.clothing_image_paths[0].image_path} 
                    size="small" 
                />
                <Button 
                    content="Customize"
                    // floated="right"
                    color="orange"
                />
                <Button 
                    content="Delete"
                    onClick={() => handleDeleteClick(c.id)}
                    // floated="right"
                    color="orange"
                />

            </Segment>
        ))
    ) : (
        <Segment>Cart Empty!</Segment>
    );
      


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
        const updatedCart = cart.filter(c => (
            c.id !== deletedId
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