import React, { Component } from "react"
import ReactDOM from "react-dom"
import Main from "./layouts/Main"

import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById("root"),
)
