import React, { Fragment } from "react"
import { Route } from "react-router-dom"
import "./Main.scss"

import { rootPath, docsPath } from "routes"
import { GlobalNav, Footer, LoadingSpinner } from "components"
import Loadable from "react-loadable"

const Home = Loadable({
  loader: () => import(/* webpackPrefetch: true */ "../pages/Home/Home"),
  loading: () => <LoadingSpinner />,
})

const Docs = Loadable({
  loader: () => import(/* webpackPrefetch: true */ "../pages/Docs/Docs"),
  loading: () => <LoadingSpinner />,
})

export default function Main() {
  return (
    <Fragment>
      <header>
        <GlobalNav />
      </header>
      <main>
        <Route exact path={rootPath} component={Home} />
        <Route path={docsPath} component={Docs} />
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  )
}
