import RadioInput from "./RadioInput"

describe("<RadioInput />", () => {
  it("renders with label tag", () => {
    const wrapper = shallow(<RadioInput label="Test" />)
    expect(wrapper).to.have.tagName("label")
  })

  it("renders label text if this.props.label is received", () => {
    const wrapper = mount(<RadioInput label="Test" />)
    expect(wrapper).to.include.text("Test")
  })

  it("calls console.warn if this.props.label is not received", () => {
    console.warn = chai.spy()
    const wrapper = mount(<RadioInput label="" />)
    wrapper.instance().getLabel()
    expect(console.warn).to.have.been.called()
  })

  it("renders a radio", () => {
    const wrapper = shallow(<RadioInput label="Test" />)
    expect(wrapper).to.have.descendants('[type="radio"]')
  })
})
