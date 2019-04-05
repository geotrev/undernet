import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Home from "./Home"

jest.mock("lottie-web", () =>
  jest.fn().mockImplementation(() => {
    return {
      loadAnimation: jest.fn(),
      play: jest.fn(),
      destroy: jest.fn(),
    }
  })
)

describe("<Home />", () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <Home />
      </Router>
    )
  })

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
