import Home from "./Home"
import { BrowserRouter as Router } from "react-router-dom"

describe("<Home />", () => {
  it("renders #home", () => {
    const wrapper = mount(
      <Router>
        <Home />
      </Router>,
    )
    expect(wrapper).to.have.id("home")
  })

  it("has one <h1> and one <h2>", () => {
    const wrapper = mount(
      <Router>
        <Home />
      </Router>,
    )
    expect(wrapper)
      .to.have.exactly(1)
      .descendants("h1")
    expect(wrapper)
      .to.have.exactly(1)
      .descendants("h2")
  })
})
