import React, { Fragment, createRef } from "react"
import { Switch, Route } from "react-router-dom"
import { Utils } from "undernet"

import { rootPath, docsPath } from "routes"
import GlobalNav from "components/GlobalNav"
import Footer from "components/Footer"
import PageNotFound from "components/PageNotFound"
import Home from "pages/Home"
import Docs from "pages/Docs"

import "./styles.scss"

export default class Main extends React.Component {
  headerRef = createRef()
  contentRef = createRef()

  componentDidMount() {
    Utils.enableFocusOutline()
  }

  // NOTE: These click events directly modify the tabindex of the elements, instead of relying on
  //       state. This is to prevent component remounts - since that would force focus to
  //       return to the header of the page via <PageHeader /> used for the doc pages.

  handleTopClick = event => {
    event.preventDefault()
    this.headerRef.current.setAttribute("tabindex", "-1")
    this.headerRef.current.focus()
    this.headerRef.current.addEventListener("blur", this.handleHeaderBlur)
  }

  handleContentClick = event => {
    event.preventDefault()
    this.contentRef.current.setAttribute("tabindex", "-1")
    this.contentRef.current.focus()
    this.contentRef.current.addEventListener("blur", this.handleContentBlur)
  }

  handleHeaderBlur = () => {
    this.headerRef.current.removeEventListener("blur", this.handleHeaderBlur)
    this.headerRef.current.removeAttribute("tabindex")
  }

  handleContentBlur = () => {
    this.contentRef.current.removeEventListener("blur", this.handleContentBlur)
    this.contentRef.current.removeAttribute("tabindex")
  }

  render() {
    return (
      <Fragment>
        <button className="is-visually-hidden" onClick={this.handleContentClick}>
          Skip to main content
        </button>
        <header ref={this.headerRef}>
          <GlobalNav />
        </header>
        <main ref={this.contentRef}>
          <Switch>
            <Route exact path={rootPath} component={Home} />
            <Route path={docsPath} component={Docs} />
            <Route component={PageNotFound} />
          </Switch>
        </main>
        <footer>
          <Footer />
          <button className="is-visually-hidden" onClick={this.handleTopClick}>
            Return to top of page
          </button>
        </footer>
      </Fragment>
    )
  }
}
