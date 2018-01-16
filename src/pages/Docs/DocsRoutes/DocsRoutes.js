import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import {
  Overview, Download, Config,
  Grid, Type, Buttons, Forms,
  Classes, Mixins, Functions
} from '../Articles/Articles';

export default class DocsRoutes extends Component {
  render() {
    return (
      <div className="small-section grid">
        <div className="docs-content">
          <Route exact path="/docs/overview" component={ Overview } />
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
}
