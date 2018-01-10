import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';

import Overview from './Overview/Overview';
import Download from './Download/Download';

export const Components = () => {
  return (
    <div id="components" class="small-section grid">
      <Route exact path="/components" component={ Overview } />
      <Route exact path="/components/download" component={ Download } />
    </div>
  );
}
