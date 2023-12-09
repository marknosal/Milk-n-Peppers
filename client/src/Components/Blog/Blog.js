import React, { useEffect, useState } from "react";
import BlogCard from './BlogCard';
import BlogExpand from "./BlogExpand";

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
            const blog = blogs.filter(b => b.id === id)
            setExpandedBlog(blog)
        } else {
            setExpandedBlog(null)
        }
    }

    return (
        <div className="blog">
            {expandedBlog ? (
                <BlogExpand blog={expandedBlog} onMinimize={handleExpand}  />
            ) : (
                <div className="blog-list">
                    <h1>Dayna's Blog:</h1>
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