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

export default class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      headerTabIndex: null,
      mainTabIndex: null,
    }

    this.headerRef = React.createRef()
    this.mainRef = React.createRef()
  }

  componentDidMount() {
    ContextUtil.enableFocusOutline()
  }

  handleHeaderFocusClick = event => {
    event.preventDefault()

    this.setState({ headerTabIndex: "-1" }, () => {
      this.headerRef.current.focus()
    })
  }

  handleMainFocusClick = event => {
    event.preventDefault()

    this.setState({ mainTabIndex: "-1" }, () => {
      this.mainRef.current.focus()
    })
  }

  handleHeaderBlur = () => {
    if (this.state.headerTabIndex === null) return
    this.setState({ headerTabIndex: null })
  }

  handleMainBlur = () => {
    if (this.state.mainTabIndex === null) return
    this.setState({ mainTabIndex: null })
  }

  render() {
    const { headerTabIndex, mainTabIndex } = this.state

    return (
      <React.Fragment>
        <header
          tabIndex={headerTabIndex}
          ref={this.headerRef}
          onBlur={this.handleHeaderBlur}
          role="heading"
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
