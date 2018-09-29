import Docs from "./Docs"
import { BrowserRouter as Router } from "react-router-dom"
import { SideNav } from "components"
import DocsRoutes from "./DocsRoutes/DocsRoutes"

describe("<Docs />", () => {
  it("renders", () => {
    const wrapper = shallow(<Docs />)
    expect(wrapper).to.exist
    expect(wrapper).to.have.length(1)
  })

  it("has one <SideNav />", () => {
    const wrapper = mount(
      <Router>
        <Docs />
      </Router>,
    )
    expect(wrapper)
      .to.have.exactly(1)
      .descendants(SideNav)
  })

  it("has one <DocsRoutes />", () => {
    const wrapper = mount(
      <Router>
        <Docs />
      </Router>,
    )
    expect(wrapper)
      .to.have.exactly(1)
      .descendants(DocsRoutes)
  })
})
