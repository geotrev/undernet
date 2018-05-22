import {
  Template,
  Overview,
  Download,
  Config,
  Grid,
  Type,
  Buttons,
  Forms,
  StyleUtilities,
  JSUtilities,
} from "./Articles"

describe("<Articles />", () => {
  let wrapper

  it("renders #articles-wrapper", () => {
    wrapper = shallow(<Template />)
    expect(wrapper).to.have.length(1)
  })

  it("can render Template (with children)", () => {
    wrapper = shallow(<Template>Testiness</Template>)
    expect(wrapper).to.include.text("Testiness")
  })

  it("can render Overview", () => {
    wrapper = shallow(<Overview />)
    expect(wrapper).to.have.length(1)
  })

  it("can render Download", () => {
    wrapper = shallow(<Download />)
    expect(wrapper).to.have.length(1)
  })

  it("can render Config", () => {
    wrapper = shallow(<Config />)
    expect(wrapper).to.have.length(1)
  })

  it("can render Grid", () => {
    wrapper = shallow(<Grid />)
    expect(wrapper).to.have.length(1)
  })

  it("can render Type", () => {
    wrapper = shallow(<Type />)
    expect(wrapper).to.have.length(1)
  })

  it("can render Buttons", () => {
    wrapper = shallow(<Buttons />)
    expect(wrapper).to.have.length(1)
  })

  it("can render Forms", () => {
    wrapper = shallow(<Forms />)
    expect(wrapper).to.have.length(1)
  })

  it("can render StyleUtilities", () => {
    wrapper = shallow(<StyleUtilities />)
    expect(wrapper).to.have.length(1)
  })

  it("can render JSUtilities", () => {
    wrapper = shallow(<JSUtilities />)
    expect(wrapper).to.have.length(1)
  })
})
