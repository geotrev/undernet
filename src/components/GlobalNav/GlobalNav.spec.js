import GlobalNav from "./GlobalNav"
import { BrowserRouter as Router } from "react-router-dom"

function NavComponent() {
  return mount(
    <Router>
      <GlobalNav />
    </Router>
  )
}

describe("<Nav />", () => {
  it("renders", () => {
    const wrapper = NavComponent()
    expect(wrapper).to.have.length(1)
    expect(wrapper).to.exist
  })

  it("renders with nav tag", () => {
    const wrapper = NavComponent()
    expect(wrapper).to.have.tagName("nav")
  })

  it("has <a> as nav link items", () => {
    const wrapper = NavComponent()
    expect(wrapper).to.have.descendants("a")
  })
})
