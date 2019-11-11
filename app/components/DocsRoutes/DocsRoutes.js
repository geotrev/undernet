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

const docRoutes = [
  "introductionPath",
  "downloadPath",
  "cssPath",
  "javascriptPath",
  "gridPath",
  "typographyPath",
  "buttonsPath",
  "formsPath",
  "modalsPath",
  "accordionsPath",
  "dropdownsPath",
  "tooltipsPath",
  "alignmentPath",
  "offsetOrderPath",
  "textPath",
  "displayPath",
  "colorPath",
  "spacingPath",
]

export default function DocsRoutes() {
  return (
    <Switch>
      {docRoutes.map(key => {
        const pageName = key.slice(0, -4)
        const componentName = pageName[0].toUpperCase() + pageName.slice(1)

        return <Route key={key} exact path={routes[key]} component={getComponent(componentName)} />
      })}
      <Route component={PageNotFound} />
    </Switch>
  )
}
