import React, { Component } from 'react';
import './Home.scss';

import Intro from './Intro/Intro';

export const Home = () => {
  return (
    <div id="home" className="small-section grid">
      <Intro greeting="This is a boilerplate built with webpack and React." />
    </div>
  );
}
