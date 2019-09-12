import React from "react"
import Article from "../Article"
import Undernet from "undernet"
import Prism from "prismjs"

jest.mock("app/components/ScrollUpOnMount", () => global.simpleMock("ScrollUpOnMount"))

global.scrollTo = jest.fn()

const components = ["Tooltips", "Accordions", "Modals", "Dropdowns"]

components.forEach(component => {
  Undernet[component].start = jest.fn()
  Undernet[component].stop = jest.fn()
})

jest.mock("prismjs", () => ({
  highlightAll: jest.fn(),
}))

const mountComponent = () => {
  const md = "# Test header \n So neat"
  return mount(<Article>{md}</Article>)
}

describe("<Article />", () => {
  describe("#render", () => {
    it("renders", () => {
      // Given
      const wrapper = mountComponent()
      // Then
      expect(wrapper).toMatchSnapshot()
    })

    it("sets fadeIn class on wrapper on mount", () => {
      // Given
      const wrapper = mountComponent()
      // Then
      const fadeInClassIsPresent = wrapper
        .find("article")
        .prop("className")
        .includes("fadeIn")
      expect(fadeInClassIsPresent).toBe(true)
    })
  })

  describe("#componentWillMount", () => {
    it("calls Prism.highlightAll on mount", () => {
      // Given
      mountComponent()
      // Then
      expect(Prism.highlightAll).toHaveBeenCalled()
    })

    components.forEach(component => {
      it(`calls Undernet.${component}.start`, () => {
        // Given
        mountComponent()
        // Then
        expect(Undernet[component].start).toHaveBeenCalled()
      })
    })
  })

  describe("#componentWillUnmount", () => {
    components.forEach(component => {
      it(`calls Undernet.${component}.stop`, () => {
        // Given
        const wrapper = mountComponent()
        // When
        wrapper.unmount()
        // Then
        expect(Undernet[component].stop).toHaveBeenCalled()
      })
    })
  })
})
