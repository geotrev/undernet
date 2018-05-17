import React from "react"
import Article from "./Article"

describe("<Article></Article>", () => {
  it("can render HTML from markdown", () => {
    const md = "# Test header \n So neat"
    const wrapper = mount(<Article>{md}</Article>)
    expect(wrapper).to.have.descendants("h1")
    expect(wrapper).to.have.descendants("p")
  })
})
