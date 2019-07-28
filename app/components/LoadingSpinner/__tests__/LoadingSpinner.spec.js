import React from "react"
import LoadingSpinner from "../LoadingSpinner"

describe("<LoadingSpinner />", () => {
  it("renders", () => {
    const wrapper = mount(<LoadingSpinner />)
    expect(wrapper).toMatchSnapshot()
  })
})
