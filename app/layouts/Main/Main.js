import React, { useState, useEffect } from "react"
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

export default function Main() {
  const [headerTabIndex, setHeaderTabIndex] = useState(UNFOCUSABLE_TABINDEX)
  const [mainTabIndex, setMainTabIndex] = useState(UNFOCUSABLE_TABINDEX)
  const headerRef = React.createRef()
  const mainRef = React.createRef()
  const componentUnmountFunction = () => {
    ContextUtil.disableFocusOutline()
  }

  useEffect(() => {
    ContextUtil.enableFocusOutline()
    return componentUnmountFunction
  }, [])

  useEffect(() => {
    if (headerTabIndex === FOCUSABLE_TABINDEX) {
      headerRef.current.focus()
    } else if (mainTabIndex === FOCUSABLE_TABINDEX) {
      mainRef.current.focus()
    }
  }, [headerTabIndex, mainTabIndex])

  const handleHeaderFocusClick = event => {
    event.preventDefault()
    setHeaderTabIndex(FOCUSABLE_TABINDEX)
  }

  const handleMainFocusClick = event => {
    event.preventDefault()
    setMainTabIndex(FOCUSABLE_TABINDEX)
  }

  const handleHeaderBlur = () => {
    if (headerTabIndex === UNFOCUSABLE_TABINDEX) return
    setHeaderTabIndex(UNFOCUSABLE_TABINDEX)
  }

  const handleMainBlur = () => {
    if (mainTabIndex === UNFOCUSABLE_TABINDEX) return
    setMainTabIndex(UNFOCUSABLE_TABINDEX)
  }

  return (
    <React.Fragment>
      <header tabIndex={headerTabIndex} ref={headerRef} onBlur={handleHeaderBlur} role="banner">
        <GlobalNav handleMainFocusClick={handleMainFocusClick} />
      </header>

      <main tabIndex={mainTabIndex} ref={mainRef} onBlur={handleMainBlur} role="main">
        <Switch>
          <Route exact path={rootPath} component={Home} />
          <Route path={docsPath} component={Docs} />
          <Route component={PageNotFound} />
        </Switch>
      </main>

      <footer>
        <Footer handleHeaderFocusClick={handleHeaderFocusClick} />
      </footer>
    </React.Fragment>
  )
}
