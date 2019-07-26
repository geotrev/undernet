import React from "react"
import Docs from "app/pages/Docs/Docs"
import { BrowserRouter as Router } from "react-router-dom"

jest.mock("app/components/DocsRoutes", () => global.simpleMock("DocsRoutes"))
jest.mock("app/components/SideNav", () => global.simpleMock("SideNav"))

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
