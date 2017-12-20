import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Index.scss';
import { Home } from './pages/Home/Home';

ReactDOM.render(
  <Router>
    <Route exact path='/' component={ Home } />
  </Router>, 
  document.getElementById('root')
);
