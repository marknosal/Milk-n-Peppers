import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, Button, Header, Image } from "semantic-ui-react";
import MeasurementList from "./MeasurementList"
import { UserContext } from "../Context/UserContext"
import "../../index.css";

export default function ExpandedClothing ({ clothing, minimizeClothing }) {
    const [imgPaths, setImgPaths] = useState([])
    const { user, addToCart, error, setError } = useContext(UserContext)

    let buttonContent = user ? 'Add To Cart' : 'Please Login To Purchase'
    if (error) buttonContent = 'Already in cart'
    
    useEffect(() => {
        fetch(`/clothing_image_path/${clothing.id}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(data => setImgPaths(data))
                }
                else {
                    response.json().then(data => {
                        setError(data)
                    })
                }
            });
        return () => {
            setError(null)
        }
    }, [clothing.id, setError])

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
                            <Header as='h1' textAlign="center">{clothing.name}</Header>
                            <Container textAlign="justified">
                                <p className="expanded-clothing-description">{clothing.description}</p>
                            </Container>
                            <MeasurementList clothing={clothing} />
                            <Button 
                                content='test'
                                className="add-cart-button" 
                                size="huge" 
                                onClick={() => addToCart(clothing.id)} 
                                disabled={!user} 
                                primary
                            >
                                {buttonContent}
                            </Button>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}