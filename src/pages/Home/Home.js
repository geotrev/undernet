import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Home.scss';

import FeatureImage from './FeatureImage/FeatureImage';
import Intro from './Intro/Intro';

export const Home = () => {
  return (
    <div id="home">
      <FeatureImage />
      <Intro greeting="This is a boilerplate built with webpack and React." />
    </div>
  );
}
