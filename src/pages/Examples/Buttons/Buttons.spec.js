import Buttons from "./Buttons"

describe("<Buttons />", () => {
  it("can render", () => {
    const wrapper = shallow(<Buttons />)
    expect(wrapper).to.have.length(1)
    expect(wrapper).to.exist
  })
})
