import Modal from "./modal"
import Undernet from "../../src/undernet"

global.window.Undernet = Undernet

describe("<Modal />", () => {
  it("renders", () => {
    const wrapper = mount(<Modal />)
    expect(wrapper).to.have.length(1)
  })
})