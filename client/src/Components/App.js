import React from 'react';
import TopBanner from './Base/TopBanner';
import SideBanner from './Base/SideBanner';
import Main from './Base/Main';
import '../index.css'

const App = () => {

  return (
    <div className='app-container'>
      <TopBanner />
      <div className='main-container'>
        <SideBanner />
        <Main />
      </div>
    </div>
  );
};

export default App;