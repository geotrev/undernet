import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Main from "./Main"

jest.mock("pages/Home", () => global.simpleMock("Home"))
jest.mock("pages/Docs", () => global.simpleMock("Docs"))
jest.mock("components/PageNotFound", () => global.simpleMock("PageNotFound"))

describe("<Main />", () => {
  it("matches snapshot", () => {
    const wrapper = mount(
      <Router>
        <Main />
      </Router>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
