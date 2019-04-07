import React from "react"
import PageNotFound from "./PageNotFound"

describe("<PageNotFound />", () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<PageNotFound />)
  })

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("renders h1 text", () => {
    expect(wrapper.find("h1").text()).toEqual("Sorry, that page doesn't exist. :(")
  })

  it("renders paragraph text", () => {
    expect(wrapper.find("p").text()).toEqual(
      "Use the links up in the navigation bar to find your way around the site!"
    )
  })
})
