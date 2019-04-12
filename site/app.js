import React from "react"
import { render } from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { LastLocationProvider } from "react-router-last-location"

import Main from "./layouts/Main"

render(
  <Router>
    <LastLocationProvider>
      <Main />
    </LastLocationProvider>
  </Router>,
  document.getElementById("__main__")
)
