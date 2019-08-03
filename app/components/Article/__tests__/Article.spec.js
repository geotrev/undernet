import React from "react"
import Article from "../Article"
import Undernet from "undernet"
import Prism from "prismjs"

global.scrollTo = jest.fn()

jest.mock("undernet", () => ({
  start: jest.fn(),
  stop: jest.fn(),
}))

jest.mock("prismjs", () => ({
  highlightAll: jest.fn(),
}))

describe("<Article />", () => {
  let wrapper
  beforeEach(() => {
    const md = "# Test header \n So neat"
    wrapper = mount(<Article>{md}</Article>)
  })

  it("renders", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("calls window.scrollTo on mount", () => {
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })

  it("calls Prism.highlightAll on mount", () => {
    expect(Prism.highlightAll).toHaveBeenCalled()
  })

  it("starts Undernet on mount", () => {
    expect(Undernet.start).toHaveBeenCalled()
  })

  it("stops Undernet on unmount", () => {
    wrapper.unmount()
    expect(Undernet.stop).toHaveBeenCalled()
  })

  it("sets fadeIn class on wrapper on mount", () => {
    expect(
      wrapper
        .find("article")
        .prop("className")
        .includes("fadeIn")
    ).toBe(true)
  })
})
