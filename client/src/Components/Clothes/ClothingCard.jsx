import { Card } from "semantic-ui-react";
import "../../index.css";

export default function ClothingCard ({ clothing, expand }) {

    function handleExpandClick () {
        expand(clothing.id)
    }

    return (
        <Card className='card-clothing' onClick={handleExpandClick}>
            <h3>{clothing.name}</h3>
            <img 
                src={'/' + clothing.clothing_image_paths[0].image_path} 
                alt={clothing.name} 
            />
        </Card>
    )
}