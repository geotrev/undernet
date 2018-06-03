import Accordions from "./Accordions"

describe("<Accordions />", () => {
  it("can render", () => {
    const wrapper = shallow(<Accordions />)
    expect(wrapper).to.have.length(1)
    expect(wrapper).to.exist
  })
})
