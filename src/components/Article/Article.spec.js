import React from "react"
import Article from "./Article"

describe("<Article></Article>", () => {
  let wrapper
  before(() => {
    const md = "# Test header \n So neat"
    wrapper = mount(<Article>{md}</Article>)
  })

  it("renders", () => {
    expect(wrapper).to.exist
  })

  it("renders an <h1>", () => {
    expect(wrapper).to.have.descendants("h1")
  })

  it("renders a <p>", () => {
    expect(wrapper).to.have.descendants("p")
  })
})
