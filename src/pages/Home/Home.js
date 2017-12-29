import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Home.scss';

import Intro from './Intro/Intro';

export const Home = () => {
  return (
    <div id="home">
      <Intro greeting="This is a boilerplate built with webpack and React." />
    </div>
  );
}
