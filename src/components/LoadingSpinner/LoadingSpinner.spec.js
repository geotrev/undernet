import LoadingSpinner from "./LoadingSpinner"
import ScaleLoader from "react-spinners/ScaleLoader"

describe("<LoadingSpinner />", () => {
  let wrapper
  before(() => {
    wrapper = mount(<LoadingSpinner />)
  })

  it("renders", () => {
    expect(wrapper).to.exist
  })

  it("renders one <ScaleLoader />", () => {
    expect(wrapper)
      .to.have.exactly(1)
      .descendants(ScaleLoader)
  })
})
