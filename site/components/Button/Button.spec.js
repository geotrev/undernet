import React from "react"
import Button from "./Button"

describe("<Button />", () => {
  it("renders", () => {
    const wrapper = shallow(<Button>Test</Button>)
    expect(wrapper).to.exist
  })

  it("renders with button tag by default", () => {
    const wrapper = shallow(<Button>Test</Button>)
    expect(wrapper).to.have.tagName("button")
  })

  it("renders an anchor if this.props.href is received", () => {
    const wrapper = shallow(<Button href="#">Test</Button>)
    expect(wrapper).to.have.tagName("a")
  })

  it("button tag can receive disabled state with this.props.disabled", () => {
    const wrapper = shallow(<Button disabled>Test</Button>)
    expect(wrapper).to.have.attr("disabled")
  })

  it("calls console.warn if link button has disabled attribute", () => {
    console.warn = chai.spy()
    mount(
      <Button href="#" disabled>
        Test
      </Button>
    )
    expect(console.warn).to.have.been.called()
  })

  it("renders a 'submit' button if [type='submit']", () => {
    const wrapper = shallow(<Button type="submit">Test</Button>)
    expect(wrapper).to.have.descendants("[type='submit']")
  })
})
