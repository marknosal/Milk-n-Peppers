import React, { useContext, useEffect, useState } from "react";
import { Card, Header, Container, Button } from "semantic-ui-react";
import BlogCard from './BlogCard';
import BlogExpand from "./BlogExpand";
import '../../index.css';
import { UserContext } from "../Context/UserContext";
import NewBlogPortal from "./NewBlogPortal";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [expandedBlog, setExpandedBlog] = useState(null);
    const [openNewBlog, setOpenNewBlog] = useState(false)

    const { user } = useContext(UserContext)
    
    useEffect(() => {
            fetch('/blogs').then(response => {
                response.json().then(data => {
                    setBlogs(data);
                });
            });
    }, []);

    const handleAddNewBlog = () => setOpenNewBlog(true)

    const handleSave = (newBlog) => {
        setBlogs([...blogs, newBlog])
        setOpenNewBlog(false)
    }

    const handleCancel = () => {
        setOpenNewBlog(false)
    }

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
            {user.id===101 ? <Button content="add blog" onClick={handleAddNewBlog} floated="right" /> : null}
            <Header as="h1" style={{ color: 'orange' }}>M + P Blog:</Header>
            {expandedBlog ? (
                <BlogExpand blog={expandedBlog} onMinimize={handleExpand} />
            ) : (
                <Card.Group itemsPerRow={3}>
                    {blogs.map(blog => (
                        <BlogCard key={blog.id} blog={blog} onExpand={handleExpand} />
                    ))}
                </Card.Group>
            )}

            <NewBlogPortal 
                open={openNewBlog}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </Container>
    );
}
