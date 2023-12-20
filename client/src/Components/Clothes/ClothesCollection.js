import { Card } from "semantic-ui-react";
import ClothingCard from "./ClothingCard";


export default function ClothesCollection ({ clothings }) {
    const cards = clothings.map(c => (
        <ClothingCard key={c.id} clothing={c} />
    ))

    return <Card.Group >{cards}</Card.Group>
}