import React from "react"

export default function BlogExpand ({ blog, onMinimize }) {

    return (
        <div>
            <h2>{blog.title}</h2>
            <p>{blog.body}</p>
            <button onClick={() => onMinimize()}>X</button>
        </div>
    )
}