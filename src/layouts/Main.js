import React, { Fragment } from "react"
import { Route } from "react-router-dom"
import "./Main.scss"
import "./assets"

import Routes from "routes"
import { GlobalNav, Footer, LoadingSpinner } from "components"
import Loadable from "react-loadable"

const Home = Loadable({
  loader: () => import("../pages/Home/Home.js"),
  loading: () => <LoadingSpinner />,
})

const Docs = Loadable({
  loader: () => import("../pages/Docs/Docs.js"),
  loading: () => <LoadingSpinner />,
})

export default function Main() {
  return (
    <Fragment>
      <header>
        <GlobalNav />
      </header>
      <main>
        <Route exact path={Routes.root} component={Home} />
        <Route path={Routes.docs.root} component={Docs} />
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  )
}
