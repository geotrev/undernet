import LoadingSpinner from "./LoadingSpinner"

describe("<LoadingSpinner />", () => {
  it("renders", () => {
    expect(mount(<LoadingSpinner />)).to.exist
    expect(mount(<LoadingSpinner />)).to.have.length(1)
  })
})
