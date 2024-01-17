import React, { useEffect, useState } from "react";
import { Card, Container, Header } from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import ClothingCard from "./ClothingCard";
import ExpandedClothing from "./ExpandedClothing";
import "../../index.css"

export default function Clothes () {
    const [clothings, setClothings] = useState([])
    const [expandClothingId, setExpandClothingId] = useState(null)

    const location = useLocation()

    useEffect(() => {
        fetch('/clothes')
            .then(r=>r.json())
                .then(d=>setClothings(d))
                    .then(() => {
                        const expandParam = new URLSearchParams(location.search).get('expand');
                        if (expandParam) {
                            const intParam = Number(expandParam)
                            setExpandClothingId(intParam)
                        }
                    })
    }, [location.search])

    const expandedClothing = expandClothingId ? clothings.find(c => c.id === expandClothingId) : null


    const cards = clothings.map(c => (
        <ClothingCard 
            key={c.id} 
            clothing={c} 
            expand={setExpandClothingId}
        />
    ))

    return expandClothingId ? (
        <ExpandedClothing clothing={expandedClothing} minimizeClothing={() => setExpandClothingId(null)} />
    ) : (
        <Container className="card-container" fluid>
            <Header as='h2'>Clothes</Header>
            <Card.Group>{cards}</Card.Group>
        </Container>
    )

}