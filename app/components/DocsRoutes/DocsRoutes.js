import React from "react"
import { Switch, Route } from "react-router-dom"
import Loadable from "react-loadable"

import * as routes from "app/routes"
import PageNotFound from "app/components/PageNotFound"
import LoadingSpinner from "app/components/LoadingSpinner"

const Loading = () => <LoadingSpinner />
Loading.displayName = "Loading"

const getComponent = component =>
  Loadable({
    loader: () => import(`./articles/${component}`),
    loading: Loading,
  })

export default function DocsRoutes() {
  return (
    <Switch>
      <Route exact path={routes.introductionPath} component={getComponent("Introduction")} />
      <Route exact path={routes.downloadPath} component={getComponent("Download")} />
      <Route exact path={routes.brandingPath} component={getComponent("Branding")} />
      <Route exact path={routes.javascriptPath} component={getComponent("Javascript")} />
      <Route exact path={routes.gridPath} component={getComponent("Grid")} />
      <Route exact path={routes.typographyPath} component={getComponent("Typography")} />
      <Route exact path={routes.buttonsPath} component={getComponent("Buttons")} />
      <Route exact path={routes.formsPath} component={getComponent("Forms")} />
      <Route exact path={routes.modalsPath} component={getComponent("Modals")} />
      <Route exact path={routes.accordionsPath} component={getComponent("Accordions")} />
      <Route exact path={routes.dropdownsPath} component={getComponent("Dropdowns")} />
      <Route exact path={routes.tooltipsPath} component={getComponent("Tooltips")} />
      <Route exact path={routes.alignmentPath} component={getComponent("Alignment")} />
      <Route exact path={routes.offsetOrderPath} component={getComponent("OffsetOrder")} />
      <Route exact path={routes.textPath} component={getComponent("Text")} />
      <Route exact path={routes.displayPath} component={getComponent("Display")} />
      <Route exact path={routes.colorPath} component={getComponent("Color")} />
      <Route exact path={routes.spacingPath} component={getComponent("Spacing")} />
      <Route component={PageNotFound} />
    </Switch>
  )
}
