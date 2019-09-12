import React from "react"
import { Switch, Route } from "react-router-dom"
import { ContextUtil } from "undernet"

import { rootPath, docsPath } from "app/routes"
import GlobalNav from "app/components/GlobalNav"
import Footer from "app/components/Footer"
import PageNotFound from "app/components/PageNotFound"
import Home from "app/pages/Home"
import Docs from "app/pages/Docs"

import "./styles.scss"

import { FOCUSABLE_TABINDEX, UNFOCUSABLE_TABINDEX } from "./constants"

export default class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      headerTabIndex: UNFOCUSABLE_TABINDEX,
      mainTabIndex: UNFOCUSABLE_TABINDEX,
    }

    this.headerRef = React.createRef()
    this.mainRef = React.createRef()
  }

  componentDidMount() {
    ContextUtil.enableFocusOutline()
  }

  handleHeaderFocusClick = event => {
    event.preventDefault()

    this.setState({ headerTabIndex: FOCUSABLE_TABINDEX }, () => {
      this.headerRef.current.focus()
    })
  }

  handleMainFocusClick = event => {
    event.preventDefault()

    this.setState({ mainTabIndex: FOCUSABLE_TABINDEX }, () => {
      this.mainRef.current.focus()
    })
  }

  handleHeaderBlur = () => {
    if (this.state.headerTabIndex === UNFOCUSABLE_TABINDEX) return
    this.setState({ headerTabIndex: UNFOCUSABLE_TABINDEX })
  }

  handleMainBlur = () => {
    if (this.state.mainTabIndex === UNFOCUSABLE_TABINDEX) return
    this.setState({ mainTabIndex: UNFOCUSABLE_TABINDEX })
  }

  render() {
    const { headerTabIndex, mainTabIndex } = this.state

    return (
      <React.Fragment>
        <header
          tabIndex={headerTabIndex}
          ref={this.headerRef}
          onBlur={this.handleHeaderBlur}
          role="banner"
        >
          <GlobalNav handleMainFocusClick={this.handleMainFocusClick} />
        </header>

        <main tabIndex={mainTabIndex} ref={this.mainRef} onBlur={this.handleMainBlur} role="main">
          <Switch>
            <Route exact path={rootPath} component={Home} />
            <Route path={docsPath} component={Docs} />
            <Route component={PageNotFound} />
          </Switch>
        </main>

        <footer>
          <Footer handleHeaderFocusClick={this.handleHeaderFocusClick} />
        </footer>
      </React.Fragment>
    )
  }
}
