import React from "react";

export default function ExpandedClothing ({ clothing, minimizeClothing }) {
    return (
        <div className='container'>
            <h1>{clothing.name}</h1>
            <button className='x-button' onClick={minimizeClothing}>X</button>
        </div>
    )
}