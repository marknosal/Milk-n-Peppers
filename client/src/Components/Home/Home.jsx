import React, { useEffect, useState } from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import WelcomeMessage from "./WelcomeMessage";
import ClothingCarousel from "./ClothingCarousel";


export default function Home() {

    const [clothingImages, setClothingImages] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    useEffect(() => {
        fetch('/clothing_image_path')
            .then(response => response.json())
                .then(data => {
                    const paths = data.map(d => ({...d, image_path: '/' + d.image_path}))
                    setClothingImages(paths)
                })
    }, [])

    return (
        <Container>
            <WelcomeMessage />

            <Segment vertical>
                <Header as="h2">Latest Blogs</Header>
                {/* <BlogSection /> */}
            </Segment>

            <Segment vertical>
                <Header as="h2">Featured Clothing</Header>
                <ClothingCarousel images={clothingImages} />
            </Segment>

            <Segment vertical>
                <Header as="h2">What Our Customers Say</Header>
                {/* <TestimonialSection testimonials={testimonials} /> */}
            </Segment>
        </Container>
    );
}
