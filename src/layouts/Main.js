import React, { Fragment } from "react"
import { Route } from "react-router-dom"
import "./Main.scss"
import "./assets"

import Routes from "routes"
import { GlobalNav, Footer } from "components"
import Loadable from "react-loadable"
import Spinner from "react-spinkit"

const NewSpinner = () => (
  <div className="has-padding-4">
    <Spinner name="folding-cube" color="lightgray" fadeIn="none" />
  </div>
)

const Home = Loadable({
  loader: () => import("../pages/Home/Home.js"),
  loading: () => <NewSpinner />,
})

const Docs = Loadable({
  loader: () => import("../pages/Docs/Docs.js"),
  loading: () => <NewSpinner />,
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
