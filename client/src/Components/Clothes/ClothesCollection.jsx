import { Card } from "semantic-ui-react";
import ClothingCard from "./ClothingCard";


export default function ClothesCollection ({ clothings, expand }) {
    const cards = clothings.map(c => (
        <ClothingCard 
            key={c.id} 
            clothing={c} 
            expand={expand}
        />
    ))

    return <Card.Group >{cards}</Card.Group>
}