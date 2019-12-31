import React from "react"
import Prism from "prismjs"
import Undernet from "undernet"
import Article from "../Article"

jest.mock("app/components/ScrollUpOnMount", () => global.simpleMock("ScrollUpOnMount"))
jest.mock("app/components/ArticleFooter", () => global.simpleMock("ArticleFooter"))

global.scrollTo = jest.fn()

Undernet.start = jest.fn()
Undernet.stop = jest.fn()

jest.mock("prismjs", () => ({
  highlightAll: jest.fn(),
}))

const mountComponent = () => {
  const md = "# Test header \n So neat"
  return mount(<Article name="Test">{md}</Article>)
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
      expect(Prism.highlightAll).toBeCalled()
    })

    it("calls Undernet.start", () => {
      // Given
      mountComponent()
      // Then
      expect(Undernet.start).toBeCalled()
    })
  })

  describe("#componentWillUnmount", () => {
    it("calls Undernet.stop", () => {
      // Given
      const wrapper = mountComponent()
      // When
      wrapper.unmount()
      // Then
      expect(Undernet.stop).toBeCalled()
    })
  })
})
