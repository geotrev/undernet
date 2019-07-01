import React from "react"
import Docs from "./Docs"
import { BrowserRouter as Router } from "react-router-dom"

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
