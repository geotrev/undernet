import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import '../public/favicon.ico';

import { HashRouter as Router, Route } from 'react-router-dom';

import { Nav } from 'components';
import { Home, About } from 'pages';

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
