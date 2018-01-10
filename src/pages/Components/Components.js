import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import './Components.scss';

import Overview from './Overview/Overview';

export const Components = () => {
  return (
    <div id="components" class="small-section grid">
      <Route exact path="/components" component={ Overview } />
    </div>
  );
}
