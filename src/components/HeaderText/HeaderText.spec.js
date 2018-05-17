import HeaderText from "./HeaderText"

describe("<HeaderText />", () => {
  it("renders with props", () => {
    const wrapper = shallow(<HeaderText>Test</HeaderText>)
    expect(wrapper).to.include.text("Test")
  })

  it("has an h3", () => {
    const wrapper = shallow(<HeaderText>Test</HeaderText>)
    expect(wrapper).to.have.descendants("h3")
  })
})
