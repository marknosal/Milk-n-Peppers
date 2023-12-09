import React, { useEffect } from "react";

export default function Blog () {
    useEffect(() => {
        fetch('/blogs').then(response => {
            response.json().then(data =>)
        })
    }, [])
    return (
        <div>Blog</div>
    )
}