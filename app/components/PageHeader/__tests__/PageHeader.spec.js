import React from "react"
import PageHeader from "../PageHeader"
import { LastLocationProvider } from "react-router-last-location"
import { BrowserRouter as Router } from "react-router-dom"

import { UNFOCUSABLE_TABINDEX } from "../constants"

const baseProps = {
  className: "test",
}

const mountComponent = newProps => {
  return mount(
    <Router>
      <LastLocationProvider>
        <PageHeader {...Object.assign({}, baseProps, newProps)}>{"Test Header"}</PageHeader>
      </LastLocationProvider>
    </Router>
  )
}

describe("<PageHeader />", () => {
  describe("#render", () => {
    it("renders", () => {
      const wrapper = mountComponent()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("#state", () => {
    it("does not focus header if lastLocation prop is not passed", () => {
      const wrapper = mountComponent()
      const headerFocused = wrapper.find("h1").is(":focus")
      expect(headerFocused).toBe(false)
    })

    it("focuses header if lastLocation prop is passed", () => {
      const wrapper = mountComponent({ lastLocation: { location: "/new-location" } })
      const headerFocused = wrapper.find("h1").is(":focus")
      expect(headerFocused).toBe(true)
    })

    it("resets h1 tabIndex to null when blurred", () => {
      const wrapper = mountComponent({ lastLocation: { location: "/new-location" } })
      wrapper.find("h1").simulate("blur")
      expect(wrapper.find("h1").props().tabIndex).toEqual(UNFOCUSABLE_TABINDEX)
    })
  })
})
