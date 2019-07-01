import React from "react"
import { Switch, Route } from "react-router-dom"
import Loadable from "react-loadable"

import * as routes from "routes"
import PageNotFound from "components/PageNotFound"
import LoadingSpinner from "components/LoadingSpinner"

const Loading = () => <LoadingSpinner />
Loading.displayName = "Loading"

function getRoute(name) {
  return Loadable({
    loader: () => import(`./articles/${name}`),
    loading: Loading,
  })
}

export default function DocsRoutes() {
  return (
    <Switch>
      <Route exact path={routes.introductionPath} component={getRoute("introduction")} />
      <Route exact path={routes.downloadPath} component={getRoute("download")} />
      <Route exact path={routes.brandingPath} component={getRoute("branding")} />
      <Route exact path={routes.javascriptPath} component={getRoute("javascript")} />
      <Route exact path={routes.accessibilityPath} component={getRoute("accessibility")} />
      <Route exact path={routes.gridPath} component={getRoute("grid")} />
      <Route exact path={routes.typographyPath} component={getRoute("typography")} />
      <Route exact path={routes.buttonsPath} component={getRoute("buttons")} />
      <Route exact path={routes.formsPath} component={getRoute("forms")} />
      <Route exact path={routes.modalsPath} component={getRoute("modals")} />
      <Route exact path={routes.accordionsPath} component={getRoute("accordions")} />
      <Route exact path={routes.dropdownsPath} component={getRoute("dropdowns")} />
      <Route exact path={routes.tooltipsPath} component={getRoute("tooltips")} />
      <Route exact path={routes.alignmentPath} component={getRoute("alignment")} />
      <Route exact path={routes.offsetOrderPath} component={getRoute("offset-order")} />
      <Route exact path={routes.textPath} component={getRoute("text")} />
      <Route exact path={routes.displayPath} component={getRoute("display")} />
      <Route exact path={routes.colorPath} component={getRoute("color")} />
      <Route exact path={routes.spacingPath} component={getRoute("spacing")} />
      <Route component={PageNotFound} />
    </Switch>
  )
}
