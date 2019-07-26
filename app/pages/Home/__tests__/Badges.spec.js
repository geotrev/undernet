import React from "react"
import Badges from "../Badges"

jest.mock(
  "../markdown/badges.md",
  () => "some status content, converted from markdown to html/text!"
)

describe("<Badges />", () => {
  it("renders", () => {
    const wrapper = mount(<Badges />)
    expect(wrapper).toMatchSnapshot()
  })
})
