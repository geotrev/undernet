import Animation from "./Animation"

describe("<Animation />", () => {
  it("renders", () => {
    const wrapper = mount(<Animation options={{}} />)
    expect(wrapper).to.exist
    expect(wrapper).to.have.length(1)
  })
})
