import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, Button, Header, Image } from "semantic-ui-react";
import Error from "../Error";
import ExpandedClothingList from "./ExpandedClothingList"
import { UserContext } from "../Context/UserContext"
import "../../index.css";

export default function ExpandedClothing ({ clothing, minimizeClothing }) {
    const [imgPaths, setImgPaths] = useState([])
    const [error, setError] = useState(null)
    const { user, addToCart } = useContext(UserContext)

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

    const handleClick = () => {

    }

    const cartButtonText = user ? 'Add To Cart' : 'Please Login To Purchase'

    return error ? (
        <Error error={error} />
    ) : (
        <Container className="expanded-clothing-container">
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Container className="image-container">
                            <Button className='x-button' size="mini" onClick={minimizeClothing}>X</Button>
                            {images}
                        </Container>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Container className="options-container">
                            <Header as='h1' textAlign="center">{clothing.name}</Header>
                            <Container textAlign="justified">
                                <p style={{ lineHeight: '1.6', fontSize: '1.2em', letterSpacing: '0.5px', textIndent: '40px' }}>{clothing.description}</p>
                            </Container>
                            <ExpandedClothingList className='expanded-clothing-list' clothing={clothing} />
                            <Button className="add-cart-button" size="huge" onClick={handleClick} disabled={!user} primary>{cartButtonText}</Button>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}