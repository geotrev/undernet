import React from "react"
import { Switch, Route } from "react-router-dom"
import { createFocusRing } from "undernet"

import { rootPath, docsPath } from "app/routes"
import GlobalNav from "app/components/GlobalNav"
import Footer from "app/components/Footer"
import PageNotFound from "app/components/PageNotFound"
import Home from "app/pages/Home"
import Docs from "app/pages/Docs"
import { useDidMount, useWillUnmount } from "app/helpers"
import { FOCUSABLE_TABINDEX, UNFOCUSABLE_TABINDEX } from "./constants"

import "./styles.scss"

export default function Main() {
  const focusRing = createFocusRing()
  const Attributes = { TABINDEX: "tabindex" }

  const headerRef = React.useRef(null)
  const mainRef = React.useRef(null)
  const getHeaderTabIndex = () => headerRef.current.getAttribute(Attributes.TABINDEX)
  const getMainTabIndex = () => mainRef.current.getAttribute(Attributes.TABINDEX)

  useDidMount(focusRing.start)
  useWillUnmount(focusRing.stop)

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
    <>
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
    </>
  )
}
