import React, { Component, Fragment } from "react"
import { Route } from "react-router-dom"
import Loadable from "react-loadable"
import "./Main.scss"

import { rootPath, docsPath } from "routes"
import { GlobalNav, Footer, LoadingSpinner } from "components"
import Undernet from "undernet"

const Home = Loadable({
  loader: () => import(/* webpackPrefetch: true */ "../pages/Home/Home"),
  loading: () => <LoadingSpinner />,
})

const Docs = Loadable({
  loader: () => import(/* webpackPrefetch: true */ "../pages/Docs/Docs"),
  loading: () => <LoadingSpinner />,
})

export default class Main extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    Undernet.Utilities.enableFocusOutline()
  }

  render() {
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
}
