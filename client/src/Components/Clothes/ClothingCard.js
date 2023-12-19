import { Card } from "semantic-ui-react";

export default function ClothingCard ({ clothing }) {
    return (
        <Card>
            <h3>{clothing.name}</h3>
        </Card>
    )
}