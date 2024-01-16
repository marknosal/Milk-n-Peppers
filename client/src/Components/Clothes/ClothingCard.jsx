import { Button, Card, Grid, GridColumn, Header, Label } from "semantic-ui-react";
import "../../index.css";

export default function ClothingCard ({ clothing, expand }) {

    function handleExpandClick () {
        expand(clothing.id)
    }

    return (
        <Card className='card-clothing' onClick={handleExpandClick}>
            <Grid columns={2}>
                <GridColumn width={8}>
                    <Header as="h3">{clothing.name}</Header>
                </GridColumn>
                <GridColumn width={8}>
                    <Header as="h4" floated="right">${clothing.price.toFixed(2)}</Header>
                </GridColumn>
            </Grid>

            
            
            <img 
                src={'/' + clothing.clothing_image_paths[0].image_path} 
                alt={clothing.name} 
            />
        </Card>
    )
}