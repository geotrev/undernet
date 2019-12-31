import React from "react"
import ArticleFooter from "../ArticleFooter"

describe("<ArticleFooter [name] />", () => {
  it("renders", () => {
    const wrapper = mount(<ArticleFooter name="JavaScript" />)
    expect(wrapper).toMatchSnapshot()
  })

  it("renders component API", () => {
    const wrapper = mount(<ArticleFooter name="Collapsible" hasAPI />)
    expect(wrapper).toMatchSnapshot()
  })
})
