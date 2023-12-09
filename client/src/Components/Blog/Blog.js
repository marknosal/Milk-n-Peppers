import React, { useEffect, useState } from "react";
import BlogCard from './BlogCard';

export default function Blog () {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetch('/blogs').then(response => {
            response.json().then(data => {
                setBlogs(data)
            })
        })
    }, [])

    return (
        <div className="blog">
            <h1>Dayna's Blog:</h1>
            <ul>
                {blogs.map(blog => {
                    return (
                        <li>
                            <BlogCard blog={blog} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}