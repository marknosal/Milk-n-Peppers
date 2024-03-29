import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SideBanner({ navLinks }) {
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function genNavLinks(navLinks) {
        const allNavLinks = navLinks.map((linkString, index) => (
            <NavLink
                key={index}
                className="side-banner-link"
                to={linkString === 'home' ? '/' : `/${linkString}`}
                style={({ isActive }) =>
                    isActive ? { background: 'white', color: 'darkorange' } : {}
                }
                activestyle={{ background: 'green' }}
            >
                {capitalizeFirstLetter(linkString)}
                {linkString === 'profile' ? '/Cart' : null}
            </NavLink>
        ));
        return allNavLinks;
    }

    return <div className="side-banner">{genNavLinks(navLinks)}</div>;
}
