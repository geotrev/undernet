import React, { Component, Fragment } from "react"
import { Route } from "react-router-dom"
import Loadable from "react-loadable"
import Undernet from "undernet"

import { rootPath, docsPath } from "routes"
import GlobalNav from "components/GlobalNav"
import Footer from "components/Footer"
import LoadingSpinner from "components/LoadingSpinner"
import Home from "pages/Home"
import Docs from "pages/Docs"

import "./styles.scss"

export default class Main extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    Undernet.Utils.enableFocusOutline()
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
