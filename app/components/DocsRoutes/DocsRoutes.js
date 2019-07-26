import React from "react"
import { Switch, Route } from "react-router-dom"
import Loadable from "react-loadable"

import * as routes from "app/routes"
import PageNotFound from "app/components/PageNotFound"
import LoadingSpinner from "app/components/LoadingSpinner"

const Loading = () => <LoadingSpinner />
Loading.displayName = "Loading"

function getRoute(component) {
  return Loadable({
    loader: () => import(`./articles/${component}`),
    loading: Loading,
  })
}

export default function DocsRoutes() {
  return (
    <Switch>
      <Route exact path={routes.introductionPath} component={getRoute("Introduction")} />
      <Route exact path={routes.downloadPath} component={getRoute("Download")} />
      <Route exact path={routes.brandingPath} component={getRoute("Branding")} />
      <Route exact path={routes.javascriptPath} component={getRoute("Javascript")} />
      <Route exact path={routes.gridPath} component={getRoute("Grid")} />
      <Route exact path={routes.typographyPath} component={getRoute("Typography")} />
      <Route exact path={routes.buttonsPath} component={getRoute("Buttons")} />
      <Route exact path={routes.formsPath} component={getRoute("Forms")} />
      <Route exact path={routes.modalsPath} component={getRoute("Modals")} />
      <Route exact path={routes.accordionsPath} component={getRoute("Accordions")} />
      <Route exact path={routes.dropdownsPath} component={getRoute("Dropdowns")} />
      <Route exact path={routes.tooltipsPath} component={getRoute("Tooltips")} />
      <Route exact path={routes.alignmentPath} component={getRoute("Alignment")} />
      <Route exact path={routes.offsetOrderPath} component={getRoute("OffsetOrder")} />
      <Route exact path={routes.textPath} component={getRoute("Text")} />
      <Route exact path={routes.displayPath} component={getRoute("Display")} />
      <Route exact path={routes.colorPath} component={getRoute("Color")} />
      <Route exact path={routes.spacingPath} component={getRoute("Spacing")} />
      <Route component={PageNotFound} />
    </Switch>
  )
}
