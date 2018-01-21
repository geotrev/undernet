import React from 'react';
import './Home.scss';

import 'images/home-bg.jpg';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'react-feather';
import { ScrollUpOnMount } from 'helpers';

const Home = () => {
  return (
    <div id="home" className="medium-section fullscreen grid">
      <ScrollUpOnMount />
      <div className="row">
        <div className="column has-center-text">
          <h1 className="h3">The core of your next front-end project.</h1>
          <h2 className="h6">Write vanilla HTML and get beautiful components.</h2>
          <Link to="docs/download" className="medium button has-feather">Download CSS <ChevronRight size={20} /></Link>
          <Link to="docs/overview" className="primary medium button has-feather">Read Docs <ChevronRight size={20} /></Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
