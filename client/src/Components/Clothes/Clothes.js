import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import ClothesCollection from "./ClothesCollection";

export default function Clothes () {
    const [clothings, setClothings] = useState([])
    useEffect(() => {
        fetch('/clothings').then(r=>r.json()).then(d=>setClothings(d))
    }, [])

    return (
        <Container>
            <h2>Clothes</h2>
            <ClothesCollection clothings={clothings} />
        </Container>
    )
}