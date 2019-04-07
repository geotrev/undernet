import React from "react"
import ScrollUpOnMount from "./ScrollUpOnMount"

global.scrollTo = jest.fn()

describe("<ScrollUpOnMount />", () => {
  it("matches snapshot", () => {
    const wrapper = mount(<ScrollUpOnMount />)
    expect(wrapper).toMatchSnapshot()
  })

  it("calls window.scrollTo when mounted", () => {
    global.scrollTo = jest.fn()
    mount(<ScrollUpOnMount />)
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
