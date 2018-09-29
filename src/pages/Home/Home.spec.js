import Home from "./Home"
import { BrowserRouter as Router } from "react-router-dom"

describe("<Home />", () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <Router>
        <Home />
      </Router>,
    )
  })

  it("renders", () => {
    expect(wrapper).to.exist
    expect(wrapper).to.have.length(1)
  })
})
