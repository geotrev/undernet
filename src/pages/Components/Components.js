import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';

import {
  Home, Download, Config,
  Grid, Type, Buttons, Forms,
  Classes, Mixins, Functions
} from './Articles/Articles';

export const Components = () => {
  return (
    <div id="components" class="small-section grid">
      <Route exact path="/components" component={ Home } />
      <Route exact path="/components/download" component={ Download } />
      <Route exact path="/components/configuration" component={ Config } />
      <Route exact path="/components/grid" component={ Grid } />
      <Route exact path="/components/typography" component={ Type } />
      <Route exact path="/components/buttons" component={ Buttons } />
      <Route exact path="/components/forms" component={ Forms } />
      <Route exact path="/components/classes" component={ Classes } />
      <Route exact path="/components/mixins" component={ Mixins } />
      <Route exact path="/components/functions" component={ Functions } />
    </div>
  );
}
