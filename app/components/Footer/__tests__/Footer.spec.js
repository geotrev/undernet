import React from "react"
import Footer from "../Footer"

jest.mock("react-feather/dist/icons/twitter", () => global.simpleMock("Twitter"))
jest.mock("react-feather/dist/icons/github", () => global.simpleMock("Github"))

describe("<Footer />", () => {
  it("renders", () => {
    const wrapper = mount(<Footer handleHeaderFocusClick={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})
