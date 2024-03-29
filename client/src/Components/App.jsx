import React, { useContext } from 'react';
import TopBanner from './Base/TopBanner';
import SideBanner from './Base/SideBanner';
import Main from './Base/Main';
import '../index.css';
import { UserContext } from './Context/UserContext';
// import BaseHeader from './Base/BaseHeader';

export default function App() {
    const { user } = useContext(UserContext);

    // let link_list = [];
    const nav_items = user ? (
        ['home', 'profile', 'clothes', 'blog', 'about']
    ) : (
        ['home', 'login', 'clothes', 'about']
    );
    // if (user) {
    //     link_list = ['home', 'profile', 'clothes', 'blog', 'about'];
    // } else {
    //     link_list = ['home', 'login', 'clothes', 'about'];
    // }

    return (
        <div className="app-container">
            <TopBanner title={'M i l k + Peppers'} />
            <div className="sidebanner-and-main-container">
                <SideBanner navLinks={nav_items} />
                <Main routeLinks={nav_items} />
            </div>
            {/* <BaseHeader /> */}
        </div>
    );
}
