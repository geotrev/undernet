import React from "react"
import LoadingSpinner from "./LoadingSpinner"

describe("<LoadingSpinner />", () => {
  it("matches snapshot", () => {
    const wrapper = mount(<LoadingSpinner />)
    expect(wrapper).toMatchSnapshot()
  })
})
