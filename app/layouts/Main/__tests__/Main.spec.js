import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Main from "../Main"

jest.mock("react-feather/dist/icons/twitter", () => global.simpleMock("Twitter"))
jest.mock("react-feather/dist/icons/github", () => global.simpleMock("Github"))
jest.mock("app/pages/Home", () => global.simpleMock("Home"))
jest.mock("app/pages/Docs", () => global.simpleMock("Docs"))
jest.mock("app/components/PageNotFound", () => global.simpleMock("PageNotFound"))

import { UNFOCUSABLE_TABINDEX } from "../constants"

const mountComponent = () => {
  return mount(
    <Router>
      <Main />
    </Router>
  )
}

describe("<Main />", () => {
  describe("#render", () => {
    it("renders", () => {
      const wrapper = mountComponent()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("Jump to top", () => {
    it("focuses header tag when jump-to-top button is clicked", () => {
      // Given
      const wrapper = mountComponent()
      const header = wrapper.find("header")
      // When
      wrapper.find("footer .is-visually-hidden-focusable").simulate("click")
      // Then
      expect(header.is(":focus")).toBe(true)
    })

    it("removes [tabindex] of header tag when blurred", () => {
      // Given
      const wrapper = mountComponent()
      const header = wrapper.find("header")
      // When
      wrapper.find("footer .is-visually-hidden-focusable").simulate("click")
      header.simulate("blur")
      // Then
      expect(header.props().tabIndex).toEqual(UNFOCUSABLE_TABINDEX)
    })
  })

  describe("Skip to main content", () => {
    it("focuses main content when skip to main content button is clicked", () => {
      // Given
      const wrapper = mountComponent()
      const main = wrapper.find("main")
      // When
      wrapper.find("header .is-visually-hidden-focusable").simulate("click")
      // Then
      expect(main.is(":focus")).toBe(true)
    })

    it("removes [tabindex] of main tag when blurred", () => {
      // Given
      const wrapper = mountComponent()
      const main = wrapper.find("main")
      // When
      wrapper.find("footer .is-visually-hidden-focusable").simulate("click")
      main.simulate("blur")
      // Then
      expect(main.props().tabIndex).toEqual(UNFOCUSABLE_TABINDEX)
    })
  })
})
