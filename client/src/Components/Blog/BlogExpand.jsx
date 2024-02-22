import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';

export default function BlogExpand({ blog, onMinimize }) {
    return (
        <Card color="orange">
            <Card.Content>
                <Card.Header>{blog.title}</Card.Header>
                <Card.Description>{blog.body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button
                    color="black"
                    floated="right"
                    icon
                    labelPosition="left"
                    onClick={() => onMinimize()}
                >
                    <Icon name="close" />
                    Close
                </Button>
            </Card.Content>
        </Card>
    );
}
