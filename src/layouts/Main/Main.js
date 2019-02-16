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

  state = {
    mounted: false,
  }

  componentDidMount() {
    Utils.enableFocusOutline()
    this.setState({ mounted: true })
  }

  renderSkipLink() {
    if (!this.state.mounted) return

    return (
      <a className="is-visually-hidden" href="#site-main">
        Skip to main content
      </a>
    )
  }

  renderTopLink() {
    if (!this.state.mounted) return

    return (
      <a className="is-visually-hidden" href="#__main__">
        Return to top of page
      </a>
    )
  }

  render() {
    return (
      <Fragment>
        {this.renderSkipLink()}
        <header>
          <GlobalNav />
        </header>
        <main id="site-main">
          <Switch>
            <Route exact path={rootPath} component={Home} />
            <Route path={docsPath} component={Docs} />
            <Route component={PageNotFound} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
        {this.renderTopLink()}
      </Fragment>
    )
  }
}
