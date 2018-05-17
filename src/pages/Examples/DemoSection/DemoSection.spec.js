import DemoSection from "./DemoSection"

describe("<DemoSection />", () => {
  it("can render", () => {
    const wrapper = shallow(<DemoSection header="test_header" />)
    expect(wrapper).to.have.length(1)
    expect(wrapper).to.exist
  })
})
