import React from 'react'
import '../../index.css'
import { Divider, Header } from 'semantic-ui-react'

export default function TopBanner ({ title }) {
    return (
        <div className='top-banner'>
            <Header as='h1'>{title}</Header>
            <Divider />
        </div>
    )
}