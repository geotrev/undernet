import React from "react"
import Article from "./Article"

global.scrollTo = jest.fn()

describe("<Article />", () => {
  let wrapper
  beforeEach(() => {
    const md = "# Test header \n So neat"
    wrapper = mount(<Article>{md}</Article>)
  })

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("calls window.scrollTo when mounted", () => {
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
