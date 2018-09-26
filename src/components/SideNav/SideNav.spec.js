import SideNav from "./SideNav"
import { BrowserRouter as Router } from "react-router-dom"

const navItems = [
  {
    header: "Test Header",
    links: [
      { name: "Test 1", url: "#" },
      { name: "Test 2", url: "#" },
      { name: "Test 3", url: "#" },
    ],
  },
]

function SideNavComponent() {
  return mount(
    <Router>
      <SideNav navItems={navItems} />
    </Router>,
  )
}

describe("<SideNav />", () => {
  it("renders", () => {
    const wrapper = SideNavComponent()
    expect(wrapper).to.exist
    expect(wrapper).to.have.length(1)
  })

  it("is collapsable/expandable with .docs-nav-expand", () => {
    const wrapper = SideNavComponent()
    const button = wrapper.find(".side-nav-expand a")
    button.simulate("click")
    expect(wrapper).to.not.have.descendants(".is-hidden")
    button.simulate("click")
    expect(wrapper).to.have.descendants(".is-hidden")
  })

  it("closes menu when a <Link /> is clicked", () => {
    const wrapper = SideNavComponent()
    const link = wrapper.find(".side-nav-menu ul a").first()
    link.simulate("click")
    expect(wrapper).to.have.descendants(".is-hidden")
  })
})
