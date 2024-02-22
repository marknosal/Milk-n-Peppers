import React from 'react';
import { Card } from 'semantic-ui-react';

export default function BlogCard({ blog, onExpand }) {
    function handleClick() {
        onExpand(blog.id);
    }

    return (
        <Card color="orange" onClick={handleClick}>
            <Card.Content>
                <Card.Header>{blog.title}</Card.Header>
            </Card.Content>
        </Card>
    );
}
