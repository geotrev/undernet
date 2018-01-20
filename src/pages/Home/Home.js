import React from 'react';
import './Home.scss';

import 'images/home-bg.jpg';

import { ScrollUpOnMount } from 'helpers';

const Home = () => {
  return (
    <div id="home" className="medium-section fullscreen grid">
      <ScrollUpOnMount />
      <div className="row">
        <div className="column has-center-text">
          <h1 className="h3">The core of your next front-end project.</h1>
          <h2 className="h6">Write vanilla HTML and get beautiful components.</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
