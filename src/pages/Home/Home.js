import React from 'react';

import { ScrollUpOnMount } from 'helpers';

const Home = () => {
  return (
    <div id="home" className="large-section grid">
      <ScrollUpOnMount />
      <div className="row">
        <div className="column has-center-text">
          <h1>The core of your next front-end project.</h1>
          <h2>Write vanilla HTML and get beautiful components.</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
