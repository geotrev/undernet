import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import '../public/favicon.ico';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';

ReactDOM.render(
  <Router>
    <Route exact path='/' component={ Home } />
  </Router>, 
  document.getElementById('root')
);
