import React from 'react'
import '../../index.css'

export default function TopBanner ({ title }) {
    return (
        <div className='top-banner'>
            <h1>{title}</h1>
            <hr />
        </div>
    )
}