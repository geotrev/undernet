import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FeatureImage from './pages/Home/FeatureImage/FeatureImage';
import Intro from './pages/Home/Intro/Intro';

const App = () => {
  return (
    <div id="site">
      <FeatureImage />
      <Intro greeting="This is a boilerplate built with webpack and React." />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
