import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Main from "../Main"

jest.mock("app/pages/Home", () => global.simpleMock("Home"))
jest.mock("app/pages/Docs", () => global.simpleMock("Docs"))
jest.mock("app/components/PageNotFound", () => global.simpleMock("PageNotFound"))

describe("<Main />", () => {
  it("renders", () => {
    const wrapper = mount(
      <Router>
        <Main />
      </Router>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
