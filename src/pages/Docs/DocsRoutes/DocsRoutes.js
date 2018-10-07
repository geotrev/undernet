import React, { Component } from "react"
import { Route } from "react-router-dom"
import Loadable from "react-loadable"

import Routes from "routes"

import { Article, LoadingSpinner } from "components"
import { Link } from "react-router-dom"
import ChevronRight from "react-feather/dist/icons/chevron-right"

function getRoute(name) {
  return Loadable({
    loader: () => import(`./articles/${name}.js`),
    loading: () => <LoadingSpinner />,
  })
}

export default function DocsRoutes() {
  return (
    <div id="docs-routes" className="small-section fluid grid">
      <div className="articles-wrapper row">
        <div className="column">
          <Route exact path={Routes.docs.overview.introduction} component={getRoute("introduction")} />
          <Route exact path={Routes.docs.overview.download} component={getRoute("download")} />
          <Route exact path={Routes.docs.overview.branding} component={getRoute("branding")} />
          <Route exact path={Routes.docs.overview.javascript} component={getRoute("javaScript")} />
          <Route exact path={Routes.docs.overview.accessibility} component={getRoute("accessibility")} />
          <Route exact path={Routes.docs.elements.grid} component={getRoute("grid")} />
          <Route exact path={Routes.docs.elements.typography} component={getRoute("typography")} />
          <Route exact path={Routes.docs.elements.buttons} component={getRoute("buttons")} />
          <Route exact path={Routes.docs.elements.forms} component={getRoute("forms")} />
          <Route exact path={Routes.docs.components.modals} component={getRoute("modals")} />
          <Route exact path={Routes.docs.components.accordions} component={getRoute("accordions")} />
          <Route exact path={Routes.docs.utilities.alignment} component={getRoute("alignment")} />
          <Route exact path={Routes.docs.utilities.offset_order} component={getRoute("offset_order")}o />
          <Route exact path={Routes.docs.utilities.text} component={getRoute("text")} />
          <Route exact path={Routes.docs.utilities.display} component={getRoute("display")} />
          <Route exact path={Routes.docs.utilities.color} component={getRoute("color")} />
          <Route exact path={Routes.docs.utilities.spacing} component={getRoute("spacing")} />
        </div>
      </div>
    </div>
  )
}
