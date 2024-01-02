import React from 'react'
import { NavLink } from 'react-router-dom';

export default function SideBanner () {
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    function genNavLinks(linkList) {

        const allNavLinks = linkList.map((linkString, index) => (
                <NavLink
                    key = {index}
                    className = 'side-banner-link'
                    to = {linkString === 'home' ? '/' : `/${linkString}`}
                    exact
                    activeStyle = {{ background: 'pink', }}
                >
                    {capitalizeFirstLetter(linkString)}
                </NavLink>
            ))
        return allNavLinks
    }

    return (
        <div className='side-banner'>
            {genNavLinks(['home', 'login', 'profile', 'about', 'blog', 'clothes', 'requests'])}
        </div>
    )
}