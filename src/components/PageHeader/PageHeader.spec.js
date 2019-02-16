import PageHeader from "./PageHeader"
import { BrowserRouter as Router } from "react-router-dom"

describe("<PageHeader />", () => {
  let wrapper
  before(() => {
    wrapper = mount(
      <Router>
        <PageHeader>{"Test Header"}</PageHeader>
      </Router>,
    )
  })

  it("renders", () => {
    expect(wrapper).to.exist
  })

  it("can receive children prop", () => {
    expect(wrapper).to.have.text("Test Header")
  })

  it("can recieve className prop", () => {
    wrapper = mount(
      <Router>
        <PageHeader className="test">{"Test Header"}</PageHeader>
      </Router>,
    )
    expect(wrapper).to.have.className("test")
  })
})
