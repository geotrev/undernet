import React from "react"
import Docs from "pages/Docs/Docs"
import { BrowserRouter as Router } from "react-router-dom"

jest.mock("components/DocsRoutes", () => global.simpleMock("DocsRoutes"))
jest.mock("components/SideNav", () => global.simpleMock("SideNav"))

describe("<Docs />", () => {
  it("renders", () => {
    const wrapper = mount(
      <Router>
        <Docs />
      </Router>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
