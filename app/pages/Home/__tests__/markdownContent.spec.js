import React from "react"
import { StatusBadges, InstallNpm, InstallAssets } from "../markdownContent"

jest.mock("../markdown/installAssets.md", () => "install assets!")
jest.mock("../markdown/installNpm.md", () => "install npm!")

describe("<StatusBadges />", () => {
  it("renders loader ", () => {
    const wrapper = shallow(<StatusBadges />)
    expect(wrapper).toMatchSnapshot()
  })

  it("renders component once resolved", async () => {
    const wrapper = await shallow(<StatusBadges />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe("<InstallNpm />", () => {
  it("renders", () => {
    const wrapper = mount(<InstallNpm />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe("<InstallAssets />", () => {
  it("renders", () => {
    const wrapper = mount(<InstallAssets />)
    expect(wrapper).toMatchSnapshot()
  })
})
