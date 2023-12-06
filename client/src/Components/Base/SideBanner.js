import React from 'react'
import { NavLink } from 'react-router-dom';

export default function SideBanner () {
    return (
        <div className='side-banner'>
            <NavLink 
                className='side-banner-link' 
                to='/' 
                exact
                activeStyle={{ background: 'pink', }}
            >
                Home
            </NavLink>
            <NavLink 
                className='side-banner-link' 
                to='/login' 
                activeStyle={{ background: 'pink', }}
            >
                Login
            </NavLink>
            <NavLink 
                className='side-banner-link' 
                to='/profile' 
                activeStyle={{ background: 'pink', }}
            >
                Profile
            </NavLink>
            <NavLink 
                className='side-banner-link' 
                to='/about' 
                activeStyle={{ background: 'pink', }}
            >
                About
            </NavLink>
            <NavLink 
                className='side-banner-link' 
                to='/blog' 
                activeStyle={{ background: 'pink', }}
            >
                Blog
            </NavLink>
            <NavLink 
                className='side-banner-link' 
                to='/clothes' 
                activeStyle={{ background: 'pink', }}
            >
                Clothes
            </NavLink>
            <NavLink 
                className='side-banner-link' 
                to='/requests' 
                activeStyle={{ background: 'pink', }}
            >
                Requests
            </NavLink>
        </div>
    )
}