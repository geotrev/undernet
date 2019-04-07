import React from "react"
import Button from "./Button"

describe("<Button />", () => {
  it("matches snapshot", () => {
    const wrapper = shallow(<Button>Test</Button>)
    expect(wrapper).toMatchSnapshot()
  })

  it("renders with button tag by default", () => {
    const wrapper = shallow(<Button>Test</Button>)
    expect(wrapper.is("button")).toEqual(true)
  })

  it("renders an anchor if this.props.href is received", () => {
    const wrapper = shallow(<Button href="#">Test</Button>)
    expect(wrapper.is("a")).toEqual(true)
  })

  it("button tag can receive disabled state with this.props.disabled", () => {
    const wrapper = shallow(<Button disabled>Test</Button>)
    expect(wrapper.prop("disabled")).toBeDefined()
  })

  it("calls console.warn if link button has disabled attribute", () => {
    console.warn = jest.fn()
    mount(
      <Button href="#" disabled>
        Test
      </Button>
    )
    expect(console.warn).toHaveBeenCalledWith(
      "*** You can't use a `disabled` state on anchor tags ***"
    )
  })

  it("renders a 'submit' button if [type='submit']", () => {
    const wrapper = shallow(<Button type="submit">Test</Button>)
    expect(wrapper.prop("type")).toEqual("submit")
  })
})
