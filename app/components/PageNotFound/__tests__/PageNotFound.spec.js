import React from "react"
import PageNotFound from "../PageNotFound"

jest.mock("app/components/SetMeta", () => global.simpleMock("SetMeta"))

describe("<PageNotFound />", () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<PageNotFound />)
  })

  it("renders", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
