import React from "react";
import { Container, Segment, Header, Icon } from "semantic-ui-react";

export default function About () {
    return (
        <Container text style={{ marginTop: '2em' }}>
            <Segment textAlign="center" color="orange">
                <Header as="h2" icon color="orange">
                    <Icon name="fire" color="orange" />
                    M i l k + PEPPERS <span style={{ color: 'red' }}>🥛🔥🌶</span>'s Shop
                    <Header.Subheader>
                        Handmade designs, Upcycled pieces, and quality thrifts
                    </Header.Subheader>
                </Header>
            </Segment>
    
            <Segment color="orange">
                <Header as="h3" textAlign="center" color="orange">
                    About Us
                </Header>
                <p>
                    At M i l k + PEPPERS, we bring you a unique blend of handmade designs,
                    upcycled treasures, and quality thrifted clothing, carefully curated to
                    elevate your style and spirit. Located in the vibrant city of Austin, Texas
                    🤠, our collection reflects the eclectic and free-spirited vibes of the
                    ATX community.
                </p>
            </Segment>
    
            <Segment color="orange">
                <Header as="h3" textAlign="center" color="orange">
                    Our Craft
                </Header>
                <p>
                    Embark on a journey through various sewing projects that breathe new life
                    into fashion. Each piece is a story waiting to be told, a manifestation of
                    creativity and sustainable style. Dress to manifest ✨ your individuality
                    with our one-of-a-kind creations that cater to every mood and occasion.
                </p>
            </Segment>
    
            <Segment color="orange">
                <Header as="h3" textAlign="center" color="orange">
                    Something for Every Mood & Occasion
                </Header>
                <p>
                    Whether you're seeking a bold statement piece, a cozy upcycled sweater, or
                    a vintage gem, M i l k + PEPPERS has got you covered. Our diverse collection
                    ensures there's something for every mood and occasion, transforming ordinary
                    moments into extraordinary ones.
                </p>
            </Segment>
    

        </Container>
    );
};
