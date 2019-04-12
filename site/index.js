import "core-js/stable"
import "regenerator-runtime/runtime"

import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { LastLocationProvider } from "react-router-last-location"

import Main from "./layouts/Main"

ReactDOM.render(
  <Router>
    <LastLocationProvider>
      <Main />
    </LastLocationProvider>
  </Router>,
  document.getElementById("__main__")
)
