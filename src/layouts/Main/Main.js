import React, { Component, Fragment } from "react"
import { Switch, Route } from "react-router-dom"
import { Utils } from "undernet"

import { rootPath, docsPath } from "routes"
import GlobalNav from "components/GlobalNav"
import Footer from "components/Footer"
import PageNotFound from "components/PageNotFound"
import Home from "pages/Home"
import Docs from "pages/Docs"

import "./styles.scss"

export default class Main extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    Utils.enableFocusOutline()
  }

  render() {
    return (
      <Fragment>
        <header>
          <GlobalNav />
        </header>
        <main>
          <Switch>
            <Route exact path={rootPath} component={Home} />
            <Route path={docsPath} component={Docs} />
            <Route component={PageNotFound} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </Fragment>
    )
  }
}
