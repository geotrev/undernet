import React from "react"
import SideNav from "./SideNav"
import { BrowserRouter as Router } from "react-router-dom"

const navItems = [
  {
    header: "Test Header",
    links: [
      { name: "Test 1", url: "#" },
      { name: "Test 2", url: "#" },
      { name: "Test 3", url: "#" },
    ],
  },
]

function SideNavComponent() {
  return mount(
    <Router>
      <SideNav navItems={navItems} />
    </Router>
  )
}

describe.only("<SideNav />", () => {
  it("matches snapshot", () => {
    const wrapper = SideNavComponent()
    expect(wrapper).toMatchSnapshot()
  })

  it("is collapsable/expandable with expand button", () => {
    const wrapper = SideNavComponent()
    const button = wrapper.find(".side-nav-expand a")
    button.simulate("click")
    expect(wrapper.find(".is-hidden")).toHaveLength(0)
    button.simulate("click")
    expect(wrapper.find(".is-hidden")).toHaveLength(1)
  })
})
