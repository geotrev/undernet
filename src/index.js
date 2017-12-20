import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import '../public/favicon.ico';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';

ReactDOM.render(
  <Router>
    <div id="site">
      <Route exact path='/' component={ Home } />
    </div>
  </Router>, 
  document.getElementById('root')
);
