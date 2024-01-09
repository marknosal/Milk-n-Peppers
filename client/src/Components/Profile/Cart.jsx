import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Segment, SegmentGroup, Header } from "semantic-ui-react";
import "../../index.css"
import CartImages from "./CartImages";
// import { UserContext } from "../Context/UserContext";

export default function Cart () {
    // const { user } = useContext(UserContext)
    const [cart, setCart] = useState([])
    const cartTotal = 5

    useEffect(() =>  {
        fetch('/customs')
            .then(response => response.json())
                .then(data => setCart(data));
    }, []);

    const cartItems = Array.isArray(cart) && cart.length > 0 ? (
        cart.map(c => (
            <Segment key={c.id} color="orange" size="massive">
                <p>{c.clothing.name}</p>
                <CartImages imagePaths={c.clothing.clothing_image_paths} />
                <div style={{ marginTop: '1em' }}>
                    <Button content="Customize" color="orange" />
                    <Button content="Delete" color="orange" onClick={() => handleDeleteClick(c.id)} />
                </div>
                <div style={{ marginBottom: 'auto', padding: '0.5em', textAlign: 'right' }}>
                    Price: ${c.clothing.price} {/* Assuming the price is accessible from the cart item */}
                </div>
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
        <div className="cart-container">
            <Divider horizontal>Cart</Divider>
            <SegmentGroup>
                {cartItems}
            </SegmentGroup>
            <Header className="cartTotalH1" as='h1' textAlign="right">Total: ${cartTotal}</Header>
        </div>
    )
}