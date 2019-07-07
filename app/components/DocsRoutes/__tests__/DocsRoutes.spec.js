import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import DocsRoutes from "../DocsRoutes"

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
