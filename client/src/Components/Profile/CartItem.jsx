import React, { useState } from "react"
import "../../index.css"
import { Segment, Button, Header } from "semantic-ui-react"
import CartImages from "./CartImages"
import CustomizationPortal from "./CustomizePortal"

export default function CartItem ({ cartItem: { id, clothing: { name, clothing_image_paths, price } }, onDeleteClick, cartItem, setCart, cart }) {
    const [showCustomizePortal, setShowCustomizePortal] = useState(false);

    const handleCustomizeClick = () => {
        setShowCustomizePortal(true);
    };
  
    const handleCancelClick = () => {
        setShowCustomizePortal(false);
    };
  
    const handleSaveClick = (customizedCustom) => {
        const updatedCart = cart.map(c => (
            c.id === customizedCustom.id ? customizedCustom : c
        ))
        setCart(updatedCart)
        setShowCustomizePortal(false);
    };
    return (
        <Segment key={id} color="orange" size="massive">
            <Header as='h2' className="cart-item-header">{name}</Header>
            <CartImages imagePaths={clothing_image_paths} />
            <div style={{ marginTop: '1em' }}>
                <Button content="Customize" color="orange" onClick={() => handleCustomizeClick()} />
                <Button content="Delete" color="orange" onClick={() => onDeleteClick(id)} />
            </div>
            <div style={{ textAlign: 'right' }}>
                Price: ${price.toFixed(2)}
            </div>

            <CustomizationPortal 
                open={showCustomizePortal} 
                onSave={handleSaveClick} 
                onCancel={handleCancelClick} 
                custom={cartItem}
            />
        </Segment>
    )
}