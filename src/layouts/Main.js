import React, { Component, Fragment } from "react"
import { Route } from "react-router-dom"
import Loadable from "react-loadable"
import "./Main.scss"

import { rootPath, docsPath } from "routes"
import { GlobalNav, Footer, LoadingSpinner } from "components"
import { Home, Docs } from "pages"
import Undernet from "undernet"

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
