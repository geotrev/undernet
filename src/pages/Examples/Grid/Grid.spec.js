import Grid from "./Grid"

describe("<Grid />", () => {
  it("can render", () => {
    const wrapper = shallow(<Grid />)
    expect(wrapper).to.have.length(1)
    expect(wrapper).to.exist
  })
})
