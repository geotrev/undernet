import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';


import {
  Home, Download, Config,
  Grid, Type, Buttons, Forms,
  Classes, Mixins, Functions
} from './Articles/Articles';

export const Docs = () => {
  return (
    <div id="docs" class="medium-section grid">
      <div className="docs-nav">
        
      </div>
      <div className="docs-content">
        <Route exact path="/docs" component={ Home } />
        <Route exact path="/docs/download" component={ Download } />
        <Route exact path="/docs/configuration" component={ Config } />
        <Route exact path="/docs/grid" component={ Grid } />
        <Route exact path="/docs/typography" component={ Type } />
        <Route exact path="/docs/buttons" component={ Buttons } />
        <Route exact path="/docs/forms" component={ Forms } />
        <Route exact path="/docs/classes" component={ Classes } />
        <Route exact path="/docs/mixins" component={ Mixins } />
        <Route exact path="/docs/functions" component={ Functions } />
      </div>
    </div>
  );
}
