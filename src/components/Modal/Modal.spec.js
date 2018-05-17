import Modal from "./Modal"

describe("<Modal />", () => {
  it("renders", () => {
    const wrapper = shallow(<Modal />)
    expect(wrapper).to.have.length(1)
    expect(wrapper).to.exist
  })
})
