import Type from "./Type"

describe("<Type />", () => {
  it("can render", () => {
    const wrapper = shallow(<Type />)
    expect(wrapper).to.have.length(1)
    expect(wrapper).to.exist
  })
})
