import React, { useEffect, useState } from "react";
import BlogCard from './BlogCard';
import BlogExpand from "./BlogExpand";
import '../../index.css'

export default function Blog () {
    const [blogs, setBlogs] = useState([])
    const [expandedBlog, setExpandedBlog] = useState(null)

    useEffect(() => {
        fetch('/blogs').then(response => {
            response.json().then(data => {
                setBlogs(data)
            })
        })
    }, [])

    function handleExpand(id) {
        if (id) {
            const blog = blogs.find(b => b.id === id)
            setExpandedBlog(blog)
        } else {
            setExpandedBlog(null)
        }
    }

    return (
        <div className="blog">
            <h1>Dayna's Blog:</h1>
            {expandedBlog && <button onClick={() => handleExpand(null)}>X</button>}
            {expandedBlog ? (
                <BlogExpand blog={expandedBlog} onMinimize={handleExpand}  />
            ) : (
                <div className="blog-list">
                    <ul>
                        {blogs.map(blog => {
                            return (
                                <li>
                                    <BlogCard blog={blog} onExpand={handleExpand} />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}