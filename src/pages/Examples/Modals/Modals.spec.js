import Modals from "./Modals"

describe("<Modals />", () => {
  it("can render", () => {
    const wrapper = shallow(<Modals />)
    expect(wrapper).to.have.length(1)
    expect(wrapper).to.exist
  })
})
