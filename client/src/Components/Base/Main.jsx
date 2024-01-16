import React from 'react'
import '../../index.css'
import { Routes, Route } from 'react-router-dom'

import Home from '../Home/Home'
import Login from '../Login/Login'
import Profile from '../Profile/Profile'
import About from '../About/About'
import Blog from '../Blog/Blog'
import Clothes from '../Clothes/Clothes'
import CheckoutForm from '../Stripe/CheckoutForm'
import Return from '../Stripe/Return'

export default function Main({ routeLinks }) {

    function genAllRoutes(routeLinks) {
        const allRoutes = routeLinks.map((routeString, index) => (
            <Route key={index} exact path={routeString === 'home' ? '/' : `/${routeString}`}>
                {getComponentForRoute(routeString)}
            </Route>
        ));

        allRoutes.push(
            <Route key="checkout" path="/checkout" element={<CheckoutForm />} />,
            <Route key="return" path="/return" element={<Return />} />
        );

        return allRoutes
    }
    function getComponentForRoute(routeString) {
        switch (routeString) {
            case 'home':
                return <Route path="/" element={<Home />} />;
            case 'login':
                return <Route path="/login" element={<Login />} />;
            case 'profile':
                return <Route path="/profile" element={<Profile />} />;
            case 'about':
                return <Route path="/about" element={<About />} />;
            case 'blog':
                return <Route path="/blog" element={<Blog />} />;
            case 'clothes':
                return <Route path="/clothes" element={<Clothes />} />;
            case 'checkout':
                return <Route path="/checkout" element={<CheckoutForm />} />;
            case 'return':
                return <Route path="/return" element={<Return />} />;
            default:
                return null;

        }
    }

    return (
        <div className='main-container'>
            <Routes>
                {genAllRoutes(routeLinks)}
            </Routes>
        </div>
    )
}