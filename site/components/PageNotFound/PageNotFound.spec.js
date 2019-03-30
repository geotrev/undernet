import React from "react"
import PageNotFound from "./PageNotFound"

describe("<PageNotFound />", () => {
  let wrapper
  before(() => {
    wrapper = mount(<PageNotFound />)
  })

  it("renders", () => {
    expect(wrapper).to.exist
  })

  it("renders h1 text", () => {
    expect(wrapper.find("h1")).to.have.text("Sorry, that page doesn't exist. :(")
  })

  it("renders paragraph text", () => {
    expect(wrapper.find("p")).to.have.text(
      "Use the links up in the navigation bar to find your way around the site!"
    )
  })
})
