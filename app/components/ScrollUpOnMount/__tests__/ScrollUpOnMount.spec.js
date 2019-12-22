import React from "react"
import ScrollUpOnMount from "../ScrollUpOnMount"

describe("<ScrollUpOnMount />", () => {
  it("calls window.scrollTo when mounted", () => {
    global.scrollTo = jest.fn()
    mount(<ScrollUpOnMount />)
    expect(window.scrollTo).toBeCalledWith(0, 0)
  })
})
