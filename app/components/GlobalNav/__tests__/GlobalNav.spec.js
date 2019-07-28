import React from "react"
import GlobalNav from "../GlobalNav"
import { BrowserRouter as Router } from "react-router-dom"

function NavComponent() {
  return mount(
    <Router>
      <GlobalNav />
    </Router>
  )
}

describe("<Nav />", () => {
  it("renders", () => {
    const wrapper = NavComponent()
    expect(wrapper).toMatchSnapshot()
  })
})
