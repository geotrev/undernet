import React, { Component } from "react"
import { Route } from "react-router-dom"
import Loadable from "react-loadable"
import { Link } from "react-router-dom"
import ChevronRight from "react-feather/dist/icons/chevron-right"

import {
  introductionPath,
  downloadPath,
  brandingPath,
  javascriptPath,
  accessibilityPath,
  gridPath,
  typographyPath,
  buttonsPath,
  formsPath,
  modalsPath,
  accordionsPath,
  dropdownsPath,
  alignmentPath,
  offsetOrderPath,
  textPath,
  displayPath,
  colorPath,
  spacingPath,
} from "routes"

import Article from "components/Article"
import LoadingSpinner from "components/LoadingSpinner"

function getRoute(name) {
  return Loadable({
    loader: () => import(`./articles/${name}`),
    loading: () => <LoadingSpinner />,
  })
}

export default function DocsRoutes() {
  return (
    <div id="docs-routes" className="small-section fluid grid">
      <div className="articles-wrapper row">
        <div className="column">
          <Route exact path={introductionPath} component={getRoute("introduction")} />
          <Route exact path={downloadPath} component={getRoute("download")} />
          <Route exact path={brandingPath} component={getRoute("branding")} />
          <Route exact path={javascriptPath} component={getRoute("javascript")} />
          <Route exact path={accessibilityPath} component={getRoute("accessibility")} />
          <Route exact path={gridPath} component={getRoute("grid")} />
          <Route exact path={typographyPath} component={getRoute("typography")} />
          <Route exact path={buttonsPath} component={getRoute("buttons")} />
          <Route exact path={formsPath} component={getRoute("forms")} />
          <Route exact path={modalsPath} component={getRoute("modals")} />
          <Route exact path={accordionsPath} component={getRoute("accordions")} />
          <Route exact path={dropdownsPath} component={getRoute("dropdowns")} />
          <Route exact path={alignmentPath} component={getRoute("alignment")} />
          <Route exact path={offsetOrderPath} component={getRoute("offset-order")} />
          <Route exact path={textPath} component={getRoute("text")} />
          <Route exact path={displayPath} component={getRoute("display")} />
          <Route exact path={colorPath} component={getRoute("color")} />
          <Route exact path={spacingPath} component={getRoute("spacing")} />
        </div>
      </div>
    </div>
  )
}
