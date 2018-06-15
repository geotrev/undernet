import Perks from "./Perks"
import { BrowserRouter as Router } from "react-router-dom"

describe("<Perks />", () => {
  it("can render", () => {
    const wrapper = shallow(
      <Router>
        <Perks />
      </Router>,
    )

    expect(wrapper).to.exist
    expect(wrapper).to.have.length(1)
  })
})
