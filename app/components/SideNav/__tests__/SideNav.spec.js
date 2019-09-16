import React from "react"
import SideNav from "../SideNav"
import { BrowserRouter as Router } from "react-router-dom"
import { Accordions } from "undernet"

jest.mock("react-feather/dist/icons/chevron-right", () => global.simpleMock("ChevronRight"))
jest.mock("react-feather/dist/icons/menu", () => global.simpleMock("Menu"))
jest.mock("projectRoot/package.json", () => ({
  version: "9.9.9",
}))

Accordions.start = jest.fn()
Accordions.stop = jest.fn()

const MENU_COLLAPSE_WIDTH = 1199
const MENU_EXPAND_WIDTH = MENU_COLLAPSE_WIDTH + 1
const DEFAULT_WIDTH = 1024
const navItems = [
  {
    header: "Test Header",
    links: [{ name: "Test 1", url: "#" }],
  },
]

function mountComponent() {
  return mount(
    <Router>
      <SideNav navItems={navItems} />
    </Router>
  )
}

function updatePageWidth(width) {
  global.window.innerWidth = width
  window.dispatchEvent(new Event("resize"))
}

describe.only("<SideNav />", () => {
  describe("#render", () => {
    it("renders", () => {
      // Given
      const wrapper = mountComponent()
      // Then
      expect(wrapper.find("SideNav")).toMatchSnapshot()
    })
  })

  describe("#state", () => {
    beforeEach(() => {
      const wrapper = mountComponent()
      wrapper.find("SideNav").setState({ menuIsOpen: true })
    })

    it("calls Accordions.stop if state.menuIsOpen changes", () => {
      expect(Accordions.stop).toHaveBeenCalled()
    })

    it("calls Accordions.start if state.menuIsOpen changes", () => {
      expect(Accordions.start).toHaveBeenCalled()
    })
  })

  describe("#handleMenuVisibility", () => {
    afterEach(() => {
      updatePageWidth(DEFAULT_WIDTH)
    })

    it(`hides menu at or below ${MENU_COLLAPSE_WIDTH}`, () => {
      // Given
      const wrapper = mountComponent()
      // Then
      expect(wrapper.find(".side-nav-wrapper")).toMatchSnapshot()
    })

    it(`shows menu above ${MENU_COLLAPSE_WIDTH}`, () => {
      // Given
      updatePageWidth(MENU_EXPAND_WIDTH)
      const wrapper = mountComponent()
      // Then
      expect(wrapper.find(".side-nav-wrapper")).toMatchSnapshot()
    })
  })

  describe("#handleMenuToggleClick", () => {
    it("toggles menu when button is clicked", () => {
      // Given
      const wrapper = mountComponent()
      const button = wrapper.find(".side-nav-expand button")
      // When
      button.simulate("click")
      // Then
      expect(wrapper.find(".side-nav-wrapper")).toMatchSnapshot()
    })
  })
})
