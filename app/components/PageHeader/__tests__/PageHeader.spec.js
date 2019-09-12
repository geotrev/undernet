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
      // Given
      const wrapper = mountComponent()
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("#state", () => {
    it("does not focus header if lastLocation prop is not passed", () => {
      // Given
      const wrapper = mountComponent()
      // When
      const headerFocused = wrapper.find("h1").is(":focus")
      // Then
      expect(headerFocused).toBe(false)
    })

    it("focuses header if lastLocation prop is passed", () => {
      // Given
      const wrapper = mountComponent({ lastLocation: { location: "/new-location" } })
      // When
      const headerFocused = wrapper.find("h1").is(":focus")
      // Then
      expect(headerFocused).toBe(true)
    })

    it("resets h1 tabIndex to null when blurred", () => {
      // Given
      const wrapper = mountComponent({ lastLocation: { location: "/new-location" } })
      // When
      wrapper.find("h1").simulate("blur")
      // Then
      expect(wrapper.find("h1").props().tabIndex).toEqual(UNFOCUSABLE_TABINDEX)
    })
  })
})
