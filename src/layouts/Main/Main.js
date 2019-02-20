import React, { Component, Fragment, createRef } from "react"
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
    headerTabIndex: null,
    contentTabIndex: null,
  }

  headerRef = createRef()
  contentRef = createRef()

  componentDidMount() {
    Utils.enableFocusOutline()
  }

  handleTopClick = event => {
    event.preventDefault()
    this.setState({ headerTabIndex: "-1" }, () => {
      this.headerRef.current.focus()
      this.headerRef.current.addEventListener("blur", this.handleHeaderBlur)
    })
  }

  handleContentClick = event => {
    event.preventDefault()
    this.setState({ contentTabIndex: "-1" }, () => {
      this.contentRef.current.focus()
      this.contentRef.current.addEventListener("blur", this.handleContentBlur)
    })
  }

  handleHeaderBlur = () => {
    this.headerRef.current.removeEventListener("blur", this.handleHeaderBlur)
    this.setState({ headerTabIndex: null })
  }

  handleContentBlur = () => {
    this.contentRef.current.removeEventListener("blur", this.handleContentBlur)
    this.setState({ contentTabIndex: null })
  }

  render() {
    return (
      <Fragment>
        <a className="is-visually-hidden" href="#" onClick={this.handleContentClick}>
          Skip to main content
        </a>
        <header ref={this.headerRef} tabIndex={this.state.headerTabIndex}>
          <GlobalNav />
        </header>
        <main ref={this.contentRef} tabIndex={this.state.contentTabIndex}>
          <Switch>
            <Route exact path={rootPath} component={Home} />
            <Route path={docsPath} component={Docs} />
            <Route component={PageNotFound} />
          </Switch>
        </main>
        <footer>
          <Footer />
          <a className="is-visually-hidden" href="#" onClick={this.handleTopClick}>
            Return to top of page
          </a>
        </footer>
      </Fragment>
    )
  }
}
