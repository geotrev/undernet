import React from "react"
import { Switch, Route } from "react-router-dom"
import Loadable from "react-loadable"

import { docPages } from "app/routes"
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
      {Object.entries(docPages).map(([name, path]) => {
        const componentName = name[0].toUpperCase() + name.slice(1)

        return <Route key={name} exact path={path} component={getComponent(componentName)} />
      })}
      <Route component={PageNotFound} />
    </Switch>
  )
}
