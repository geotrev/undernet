import React from "react"
import PageNotFound from "../PageNotFound"

describe("<PageNotFound />", () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<PageNotFound />)
  })

  it("renders", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
