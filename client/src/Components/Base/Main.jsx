import React from 'react'
import '../../index.css'
import { Switch, Route } from 'react-router-dom'

import Home from '../Home/Home'
import Login from '../Login/Login'
import Profile from '../Profile/Profile'
import About from '../About/About'
import Blog from '../Blog/Blog'
import Clothes from '../Clothes/Clothes'
import Requests from '../Requests/Requests'

export default function Main() {

    function genAllRoutes(routeList) {
        const allRoutes = routeList.map((routeString, index) => (
            <Route key={index} exact path={routeString === 'Home' ? '/' : `/${routeString}`}>
                {getComponentForRoute(routeString)}
            </Route>
        ))
        return allRoutes
    }
    function getComponentForRoute(routeString) {
        switch (routeString) {
            case 'Home':
                return <Home />;
            case 'Login':
                return <Login />;
            case 'Profile':
                return <Profile />;
            case 'About':
                return <About />;
            case 'Blog':
                return <Blog />;
            case 'Clothes':
                return <Clothes />;
            case 'Requests':
                return <Requests />;
            default:
                return null;

        }
    }

    return (
        <div className='main-container'>
            <Switch>
                {genAllRoutes(['Home', 'Login', 'Profile', 'About', 'Blog', 'Clothes', 'Requests'])}
            </Switch>
        </div>
    )
}