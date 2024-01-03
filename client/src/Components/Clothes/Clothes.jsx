import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import ClothesCollection from "./ClothesCollection";
import ExpandedClothing from "./ExpandedClothing";
import "../../index.css"

export default function Clothes () {
    const [clothings, setClothings] = useState([])
    const [expandClothingId, setExpandClothingId] = useState(null)
    useEffect(() => {
        fetch('/clothes').then(r=>r.json()).then(d=>setClothings(d))
    }, [])
    const expandedClothing = clothings.find(c => c.id === expandClothingId)

    return expandClothingId ? (
        <ExpandedClothing clothing={expandedClothing} minimizeClothing={() => setExpandClothingId(null)} />
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