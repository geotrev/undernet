import React from "react"
import GlobalNav from "../GlobalNav"
import { BrowserRouter as Router } from "react-router-dom"

describe("<Nav />", () => {
  const baseProps = {
    handleMainFocusClick: jest.fn(),
  }

  const mountComponent = () => {
    return mount(
      <Router>
        <GlobalNav {...baseProps} />
      </Router>
    )
  }

  it("renders", () => {
    // Given
    const wrapper = mountComponent()
    // Then
    expect(wrapper).toMatchSnapshot()
  })

  it("calls handleMainFocusClick prop when hidden button is clicked", () => {
    // Given
    const wrapper = mountComponent()
    // When
    wrapper.find(".is-visually-hidden-focusable").simulate("click")
    // Then
    expect(baseProps.handleMainFocusClick).toHaveBeenCalled()
  })
})
