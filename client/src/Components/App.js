import React from 'react';
import TopBanner from './Base/TopBanner';
import SideBanner from './Base/SideBanner';
import Main from './Base/Main';
import '../index.css'

export default function App () {
    return (
        <div className='app-container'>
            <TopBanner title={'Milk n Peppers'} />
            <div className='not-top-container'>
                <SideBanner />
                <Main />
            </div>
        </div>
    );
};