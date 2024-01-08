import React, { useContext } from "react";
import { Container, Divider, Segment, SegmentGroup } from "semantic-ui-react";
import { UserContext } from "../Context/UserContext";

export default function Cart () {
    const { userCart } = useContext(UserContext)
    console.log(userCart)
    return (
        <Container className="cart-container">
            <Divider horizontal>Cart</Divider>
            <SegmentGroup>
                <Segment>hi</Segment>
            </SegmentGroup>
        </Container>
    )
}