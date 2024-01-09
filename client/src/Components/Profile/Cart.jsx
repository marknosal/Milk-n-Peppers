import React, { useEffect, useState } from "react";
import { Divider, Segment, SegmentGroup, Header } from "semantic-ui-react";
import "../../index.css"
import CartItem from "./CartItem";

export default function Cart () {
    // const { user } = useContext(UserContext)
    const [cart, setCart] = useState([])
    
    useEffect(() =>  {
        fetch('/customs')
        .then(response => response.json())
        .then(data => setCart(data));
    }, []);

    const cartTotal = cart.reduce((total, c) => total + c.clothing.price, 0)
    
    const cartItems = Array.isArray(cart) && cart.length > 0 ? (
        cart.map(c => (
            <CartItem cartItem={c} onDeleteClick={handleDeleteClick} />
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