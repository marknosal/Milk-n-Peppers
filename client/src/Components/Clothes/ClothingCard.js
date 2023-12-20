import { Card } from "semantic-ui-react";
import "../../index.css";

export default function ClothingCard ({ clothing }) {
    return (
        <Card className='card-clothing'>
            <h3>{clothing.name}</h3>
        </Card>
    )
}