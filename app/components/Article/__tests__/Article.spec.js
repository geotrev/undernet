import React from "react"
import Article from "../Article"
import Prism from "prismjs"
import { COMPONENTS } from "../constants"

jest.mock("app/components/ScrollUpOnMount", () => global.simpleMock("ScrollUpOnMount"))

global.scrollTo = jest.fn()

COMPONENTS.forEach(Component => {
  Component.start = jest.fn()
  Component.stop = jest.fn()
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

  describe("#componentDidMount", () => {
    it("calls Prism.highlightAll on mount", () => {
      // Given
      mountComponent()
      // Then
      expect(Prism.highlightAll).toHaveBeenCalled()
    })

    COMPONENTS.forEach(Component => {
      it(`calls ${Component.constructor.name}.start`, () => {
        // Given
        mountComponent()
        // Then
        expect(Component.start).toHaveBeenCalled()
      })
    })
  })

  describe("#componentWillUnmount", () => {
    COMPONENTS.forEach(Component => {
      it(`calls ${Component.constructor.name}.stop`, () => {
        // Given
        const wrapper = mountComponent()
        // When
        wrapper.unmount()
        // Then
        expect(Component.stop).toHaveBeenCalled()
      })
    })
  })
})
