import React from "react"
import { Route } from "react-router-dom"

import {
  Overview,
  Download,
  Config,
  Grid,
  Type,
  Buttons,
  Forms,
  Modals,
  StyleUtilities,
  JSUtilities,
} from "../Articles/Articles"

const DocsRoutes = () => {
  return (
    <div className="docs-routes-wrapper small-section grid">
      <div className="row">
        <Route exact path="/docs/overview" component={Overview} />
        <Route exact path="/docs/download" component={Download} />
        <Route exact path="/docs/configuration" component={Config} />
        <Route exact path="/docs/grid" component={Grid} />
        <Route exact path="/docs/typography" component={Type} />
        <Route exact path="/docs/buttons" component={Buttons} />
        <Route exact path="/docs/forms" component={Forms} />
        <Route exact path="/docs/modals" component={Modals} />
        <Route exact path="/docs/style-utilities" component={StyleUtilities} />
        <Route exact path="/docs/javascript-utilities" component={JSUtilities} />
      </div>
    </div>
  )
}

export default DocsRoutes
