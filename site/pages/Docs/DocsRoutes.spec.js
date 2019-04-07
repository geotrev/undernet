import React from "react"
import DocsRoutes from "./DocsRoutes"
import { BrowserRouter as Router } from "react-router-dom"

function mountRoutes() {
  return mount(
    <Router>
      <DocsRoutes />
    </Router>
  )
}

describe("<DocsRoutes />", () => {
  it("matches snapshot", () => {
    const wrapper = mountRoutes()
    expect(wrapper).toMatchSnapshot()
  })
})
