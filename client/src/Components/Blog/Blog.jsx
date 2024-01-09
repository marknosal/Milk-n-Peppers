import React, { useEffect, useState } from "react";
import { Card, Header, Container } from "semantic-ui-react";
import BlogCard from './BlogCard';
import BlogExpand from "./BlogExpand";
import '../../index.css';

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [expandedBlog, setExpandedBlog] = useState(null);

    useEffect(() => {
            fetch('/blogs').then(response => {
                response.json().then(data => {
                    setBlogs(data);
                });
            });
    }, []);

    function handleExpand(id) {
        if (id) {
            const blog = blogs.find(b => b.id === id);
            setExpandedBlog(blog);
        } else {
            setExpandedBlog(null);
        }
    }

    return (
        <Container className="blog">
            <Header as="h1" style={{ color: 'orange' }}>Dayna's Blog:</Header>

            {expandedBlog ? (
                <BlogExpand blog={expandedBlog} onMinimize={handleExpand} />
            ) : (
                <Card.Group itemsPerRow={3}>
                    {blogs.map(blog => (
                        <BlogCard key={blog.id} blog={blog} onExpand={handleExpand} />
                    ))}
                </Card.Group>
            )}
        </Container>
    );
}
