import React, { useEffect } from "react"
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
  const headerRef = React.useRef(null)
  const mainRef = React.useRef(null)
  const Attributes = {
    TABINDEX: "tabindex",
  }
  const getHeaderTabIndex = () => headerRef.current.getAttribute(Attributes.TABINDEX)
  const getMainTabIndex = () => mainRef.current.getAttribute(Attributes.TABINDEX)

  const componentUnmountFunction = () => {
    ContextUtil.disableFocusOutline()
  }

  const onMountOnly = []
  useEffect(() => {
    ContextUtil.enableFocusOutline()
    return componentUnmountFunction
  }, onMountOnly)

  const handleRefocusClick = ref => {
    ref.current.setAttribute(Attributes.TABINDEX, FOCUSABLE_TABINDEX)
    ref.current.focus()
  }

  const handleHeaderBlur = () => {
    if (getHeaderTabIndex() === UNFOCUSABLE_TABINDEX) return
    headerRef.current.removeAttribute(Attributes.TABINDEX)
  }

  const handleMainBlur = () => {
    if (getMainTabIndex() === UNFOCUSABLE_TABINDEX) return
    mainRef.current.removeAttribute(Attributes.TABINDEX)
  }

  return (
    <React.Fragment>
      <header ref={headerRef} onBlur={handleHeaderBlur} role="banner">
        <GlobalNav handleRefocusClick={handleRefocusClick} mainRef={mainRef} />
      </header>

      <main ref={mainRef} onBlur={handleMainBlur} role="main">
        <Switch>
          <Route exact path={rootPath} component={Home} />
          <Route path={docsPath} component={Docs} />
          <Route component={PageNotFound} />
        </Switch>
      </main>

      <footer>
        <Footer handleRefocusClick={handleRefocusClick} headerRef={headerRef} />
      </footer>
    </React.Fragment>
  )
}
