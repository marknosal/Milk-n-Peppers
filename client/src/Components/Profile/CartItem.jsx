import React from "react"
import "../../index.css"
import { Segment, Button } from "semantic-ui-react"
import CartImages from "./CartImages"

export default function CartItem ({ item: { id, clothing: { name, clothing_image_paths, price } }, onDeleteClick }) {
    return (
        <Segment key={id} color="orange" size="massive">
            <p>{name}</p>
            <CartImages imagePaths={clothing_image_paths} />
            <div style={{ marginTop: '1em' }}>
                <Button content="Customize" color="orange" />
                <Button content="Delete" color="orange" onClick={() => onDeleteClick(id)} />
            </div>
            <div style={{ marginBottom: 'auto', padding: '0.5em', textAlign: 'right' }}>
                Price: ${price}
            </div>
        </Segment>
    )
}