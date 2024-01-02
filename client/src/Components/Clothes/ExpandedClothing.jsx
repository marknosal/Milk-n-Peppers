import React, { useEffect, useState } from "react";
import { Container, Grid, Button, List, Header, Image, ListItem } from "semantic-ui-react";
import Error from "../Error";
import "../../index.css";

export default function ExpandedClothing ({ clothing, minimizeClothing }) {
    const [imgPaths, setImgPaths] = useState([])
    const [error, setError] = useState(null)

    // const { type, name, price, inseam, chest, waist, hips, } = clothing

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

    const clothing_list = ({ clothing }) => {
        const propsToMap = ['inseam', 'chest', 'waist', 'hips'];
        const nonZeroVals = propsToMap
            .filter(prop => clothing[prop] !== 0)
            .map(prop => ({
                name: prop.charAt(0).toUpperCase() + prop.slice(1),
                value: clothing[prop],
            }));
        console.log(nonZeroVals)

        return (
            <List>
                {nonZeroVals.map(({ name, value }) => (
                    <ListItem key={name}>
                        <strong>{name}:</strong> {value}
                    </ListItem>
                ))}
            </List>
        );
    };


    return error ? (
        <Error error={error} />
    ) : (
        <Container className="expanded-image-container">
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <div className="image-container">
                            {images}
                        </div>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <div className="options-container">
                            <Header as='h1' textAlign="center">{clothing.name}</Header>
                            <Button className='x-button' onClick={minimizeClothing} secondary>X</Button>
                            {clothing_list({ clothing })}
                            <Button primary>Add to Cart</Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}