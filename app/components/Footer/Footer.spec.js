import React from "react"
import Footer from "./Footer"

describe("<Footer />", () => {
  it("renders", () => {
    const wrapper = mount(<Footer />)
    expect(wrapper).toMatchSnapshot()
  })
})
