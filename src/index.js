import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import ScrollUpOnRefresh from './ScrollUpOnRefresh';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <ScrollUpOnRefresh>
      <App />
    </ScrollUpOnRefresh>
  </Router>,
  document.getElementById('root')
);
