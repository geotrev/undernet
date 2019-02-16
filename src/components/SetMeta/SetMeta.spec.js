import SetMeta from "./SetMeta"
import { Helmet } from "react-helmet"

describe("<SetMeta />", () => {
  let wrapper
  before(() => {
    wrapper = mount(<SetMeta title="Test title" description="Test description" />)
  })

  it("renders", () => {
    expect(wrapper).to.exist
  })

  it("renders <Helmet />", () => {
    expect(wrapper)
      .to.have.exactly(1)
      .descendants(Helmet)
  })

  it("sets title on document", () => {
    const element = document.querySelector("title")
    expect(element.innerHTML).to.equal("Undernet – Test title")
  })

  it("sets description meta on document", () => {
    const element = document.querySelector("meta[name='description']")
    expect(element.getAttribute("content")).to.equal("Test description")
  })
})
