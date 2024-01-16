import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, Button, Header, Image } from "semantic-ui-react";
import MeasurementList from "./MeasurementList"
import { UserContext } from "../Context/UserContext"
import "../../index.css";

export default function ExpandedClothing ({ clothing, minimizeClothing }) {

    const [imgPaths, setImgPaths] = useState([])
    const [buttonContent, setButtonContent] = useState('Add To Cart')
    const { user } = useContext(UserContext)

    useEffect(() => {
        fetch(`/clothing_image_path/${clothing.id}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(data => setImgPaths(data))
                }
                else {
                    response.json().then(data => {
                        console.log(data)
                    })
                }
            });

    }, [clothing.id])

    const images = imgPaths.map(imgPath => {
        return (
            <Image 
                key={imgPath.id}
                className="expanded-image" 
                src={'/'+imgPath.image_path} 
                alt={clothing.name} 
            />
        )
    })
    
    function addToCart(clothingId) {
        fetch('/customs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'clothing_id': clothingId})
        }).then(response => {
            if (response.ok) {
                setButtonContent('Added!')
                response.json().then(data => console.log(data))
            } else {
                response.json().then(data => setButtonContent(data.error))
            }
        })
    }

    return (
        <Container className="expanded-clothing-container">
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Container className="image-container">
                            <Button 
                                className='x-button' 
                                size="mini" 
                                onClick={minimizeClothing}
                            >
                                X
                            </Button>
                            {images}
                        </Container>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Container className="options-container">
                            <Header as='h1' textAlign="center">{clothing.name} (${clothing.price.toFixed(2)})</Header>
                            <Container textAlign="justified">
                                <p className="expanded-clothing-description">{clothing.description}</p>
                            </Container>
                            <MeasurementList clothing={clothing} />
                            <Button 
                                content={user ? buttonContent : 'Please Login To Purchase'}
                                className="add-cart-button" 
                                size="huge" 
                                onClick={() => addToCart(clothing.id)} 
                                disabled={!user} 
                                primary
                            />
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}