import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { LastLocationProvider } from "react-router-last-location"
import Home from "../Home"

jest.mock("app/components/ScrollUpOnMount", () => global.simpleMock("ScrollUpOnMount"))
jest.mock("app/components/SetMeta", () => global.simpleMock("SetMeta"))
jest.mock("app/components/PageHeader", () => global.simpleMock("PageHeader"))
jest.mock("react-feather/dist/icons/chevron-right", () => global.simpleMock("ChevronRight"))

jest.mock("../markdownContent", () => ({
  StatusBadges: global.simpleMock("StatusBadges"),
  InstallNpm: global.simpleMock("InstallNpm"),
  InstallAssets: global.simpleMock("Install"),
}))

jest.mock("projectRoot/package.json", () => ({
  description: "Mocked description",
  version: "9.9.9",
}))

jest.mock("prismjs", () => ({
  highlightAll: jest.fn(),
}))

jest.mock("lottie-web", () => ({
  loadAnimation: jest.fn().mockImplementation(() => ({
    play: jest.fn(),
    destroy: jest.fn(),
  })),
}))

const mountComponent = () => {
  return mount(
    <Router>
      <LastLocationProvider>
        <Home />
      </LastLocationProvider>
    </Router>
  )
}

describe("<Home />", () => {
  it("renders", () => {
    const wrapper = mountComponent()
    expect(wrapper).toMatchSnapshot()
  })
})
