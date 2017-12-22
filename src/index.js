import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import '../public/favicon.ico';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Nav } from 'components';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';

ReactDOM.render(
  <Router>
    <div id="site">
      <Route path='/' component={ Nav } />
      <Route exact path='/' component={ Home } />
      <Route exact path='/about' component={ About } />
    </div>
  </Router>, 
  document.getElementById('root')
);
