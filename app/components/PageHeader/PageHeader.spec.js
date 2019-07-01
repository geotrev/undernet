import React from "react"
import PageHeader from "./PageHeader"
import { LastLocationProvider } from "react-router-last-location"
import { BrowserRouter as Router } from "react-router-dom"

describe("<PageHeader />", () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <LastLocationProvider>
          <PageHeader>{"Test Header"}</PageHeader>
        </LastLocationProvider>
      </Router>
    )
  })

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("can receive children prop", () => {
    expect(wrapper.find("h1").text()).toEqual("Test Header")
  })

  it("can recieve className prop", () => {
    wrapper = mount(
      <Router>
        <PageHeader className="test">{"Test Header"}</PageHeader>
      </Router>
    )
    expect(wrapper.find("h1").prop("className")).toMatch(/test/)
  })
})
