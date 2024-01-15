import React from 'react'
import '../../index.css'
import { Switch, Route } from 'react-router-dom'

import Home from '../Home/Home'
import Login from '../Login/Login'
import Profile from '../Profile/Profile'
import About from '../About/About'
import Blog from '../Blog/Blog'
import Clothes from '../Clothes/Clothes'

export default function Main({ routeLinks }) {

    function genAllRoutes(routeLinks) {
        const allRoutes = routeLinks.map((routeString, index) => (
            <Route key={index} exact path={routeString === 'home' ? '/' : `/${routeString}`}>
                {getComponentForRoute(routeString)}
            </Route>
        ))
        return allRoutes
    }
    function getComponentForRoute(routeString) {
        switch (routeString) {
            case 'home':
                return <Home />;
            case 'login':
                return <Login />;
            case 'profile':
                return <Profile />;
            case 'about':
                return <About />;
            case 'blog':
                return <Blog />;
            case 'clothes':
                return <Clothes />;
            default:
                return null;

        }
    }

    return (
        <div className='main-container'>
            <Switch>
                {genAllRoutes(routeLinks)}
            </Switch>
            
        </div>
    )
}