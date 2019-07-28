import React from "react"
import SetMeta from "../SetMeta"

describe("<SetMeta />", () => {
  it("renders", () => {
    const wrapper = mount(<SetMeta title="Test title" description="Test description" />)
    expect(wrapper).toMatchSnapshot()
  })
})
