import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import DocsRoutes from "../DocsRoutes"

jest.mock("app/components/PageNotFound", () => global.simpleMock("PageNotFound"))

function mountRoutes() {
  return mount(
    <Router>
      <DocsRoutes />
    </Router>
  )
}

describe("<DocsRoutes />", () => {
  it("renders", () => {
    const wrapper = mountRoutes()
    expect(wrapper).toMatchSnapshot()
  })
})
