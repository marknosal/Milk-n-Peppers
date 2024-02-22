import React from 'react';
import { Segment, Icon, Message } from 'semantic-ui-react';

export default function BaseHeader() {
    return (
        <Segment color="orange">
            <Message icon>
                <Icon name="envelope outline" />
                <Message.Content>
                    <Message.Header>Connect with Us!</Message.Header>
                    <p>
                        Find us on{' '}
                        <a
                            href="https://www.depop.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Depop
                        </a>{' '}
                        and{' '}
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>{' '}
                        for the latest updates.
                    </p>
                    <p>Feel free to reach out and say hello!</p>
                </Message.Content>
            </Message>
        </Segment>
    );
}
