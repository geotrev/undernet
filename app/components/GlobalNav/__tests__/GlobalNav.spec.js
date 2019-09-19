import React from "react"
import GlobalNav from "../GlobalNav"
import { BrowserRouter as Router } from "react-router-dom"

describe("<Nav />", () => {
  const baseProps = {
    handleRefocusClick: jest.fn(),
    mainRef: {
      current: document.createElement("main"),
    },
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

  it("calls handleRefocusClick prop when hidden button is clicked", () => {
    // Given
    const wrapper = mountComponent()
    // When
    wrapper.find(".is-visually-hidden-focusable").simulate("click")
    // Then
    expect(baseProps.handleRefocusClick).toHaveBeenCalledWith(baseProps.mainRef)
  })
})
