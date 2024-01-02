import React, { useEffect, useState } from "react";
import Error from "../Error";
import "../../index.css";

export default function ExpandedClothing ({ clothing, minimizeClothing }) {
    const [imgPaths, setImgPaths] = useState([])
    const [error, setError] = useState(null)

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
        return <img src={'/'+imgPath.image_path} alt={clothing.name} />
    })
    return error ? (
        <Error error={error} />
    ) : (
        <div className='container'>
            <h1 className="clothing-title">{clothing.name}</h1>
            <button className='x-button' onClick={minimizeClothing}>
                X
            </button>
            <div className="image-container">{images}</div>
        </div>
    )
}