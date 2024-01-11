import React, { useEffect, useState } from "react";
import { Divider, Segment, SegmentGroup, Header, Button, Label } from "semantic-ui-react";
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
            <CartItem key={c.id} cartItem={c} onDeleteClick={handleDeleteClick} setCart={setCart} cart={cart} />
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

    function handlePurchaseClick() {
        console.log()
    }

    return (
        <div className="cart-container">
            <Divider horizontal>Cart</Divider>
            <Button className="purchase-button" content='Purchase' />
            <SegmentGroup>

                {cartItems}
            </SegmentGroup>

                <Header className="cartTotalH1" as='h1' textAlign="right">
                    <Label 
                        style={{ marginBottom: '5px' }} 
                        pointing='right' 
                        color="orange" 
                        size="big"
                        onClick={handlePurchaseClick}
                    >
                        Click to Purchase!
                    </Label>
                    Total: ${cartTotal}
                </Header>        
        </div>
    )
}