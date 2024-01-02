import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import ClothesCollection from "./ClothesCollection";
import ExpandedClothing from "./ExpandedClothing";
import "../../index.css"

export default function Clothes () {
    const [clothings, setClothings] = useState([])
    const [expandClothingId, setExpandClothingId] = useState(null)
    useEffect(() => {
        fetch('/clothings').then(r=>r.json()).then(d=>setClothings(d))
    }, [])

    return expandClothingId ? (
        <ExpandedClothing clothing={ExpandedClothing} />
    ) : (
        <Container className="card-container" fluid>
            <h2>Clothes</h2>
            <ClothesCollection 
                clothings={clothings} 
                expand={setExpandClothingId}
            />
        </Container>
    )

}