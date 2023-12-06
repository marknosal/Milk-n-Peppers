import React from 'react'
import { NavLink } from 'react-router-dom';

export default function SideBanner () {

    function genNavLinks(linkList) {
        const allLinks = ['/', ...linkList]
        const allNavLinks = allLinks.map((linkString, index) => (
                <NavLink
                    key = {index}
                    className = 'side-banner-link'
                    to = {linkString}
                    exact
                    activeStyle = {{ background: 'pink', }}
                >
                    {`${linkString}`}
                </NavLink>
            ))
        return allNavLinks
    }

    return (
        <div className='side-banner'>
            {genNavLinks(['login', 'profile', 'about', 'blog', 'clothes', 'requests'])}
        </div>
    )
}