import Docs from "./Docs"
import { BrowserRouter as Router } from "react-router-dom"

describe("<Docs />", () => {
  it("renders", () => {
    const wrapper = shallow(<Docs />)
    expect(wrapper).to.exist
    expect(wrapper).to.have.length(1)
  })

  it("has one <DocsNav />", () => {
    const wrapper = mount(
      <Router>
        <Docs />
      </Router>,
    )
    expect(wrapper)
      .to.have.exactly(1)
      .descendants(".side-nav-wrapper")
  })

  it("has one <DocsRoutes />", () => {
    const wrapper = mount(
      <Router>
        <Docs />
      </Router>,
    )
    expect(wrapper)
      .to.have.exactly(1)
      .descendants(".docs-routes-wrapper")
  })
})
