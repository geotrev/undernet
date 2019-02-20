import DocsRoutes from "./DocsRoutes"
import { BrowserRouter as Router } from "react-router-dom"

function routes() {
  return mount(
    <Router>
      <DocsRoutes />
    </Router>
  )
}

describe("<DocsRoutes />", () => {
  it("renders", () => {
    const wrapper = routes()
    expect(wrapper).to.exist
    expect(wrapper).to.have.length(1)
  })
})
