import Examples from "./Examples"
import { BrowserRouter as Router } from "react-router-dom"

describe("<Examples />", () => {
  it("can render", () => {
    const wrapper = shallow(<Examples />)
    expect(wrapper).to.exist
    expect(wrapper).to.have.length(1)
  })
})
