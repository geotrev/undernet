import Undernet from "undernet"
import { throttle } from "lodash-es"

const DISPLAY_NONE_CLASS = "is-d-none"
const ARIA_EXPANDED_ATTR = "aria-expanded"

const SidebarCollapsibles = () => {
  const { pathname } = window.location
  const [collapsibleId, pageName] = pathname.split("/").slice(1)

  const activeCollapsible = document.querySelector(
    `[data-collapsible="nav-collapsible--${collapsibleId}"]`
  )
  const activePageLink = document.querySelector(`#nav-link--${pageName}`)

  return {
    init() {
      activeCollapsible.setAttribute("data-visible", "true")
      activePageLink.classList.add("active")
    },
  }
}

const MobileMenu = () => {
  const sideNavMenuButton = document.getElementById("side-nav-menu-button")
  const sideNavAccordion = document.getElementById("nav-accordion-menu")

  const isNarrow = () => window.innerWidth < 1199
  let isExpanded = sideNavMenuButton.getAttribute(ARIA_EXPANDED_ATTR) === "true"

  const openNavMenu = () => {
    sideNavMenuButton.setAttribute(ARIA_EXPANDED_ATTR, "false")
    sideNavAccordion.classList.remove(DISPLAY_NONE_CLASS)
    isExpanded = true
  }

  const closeNavMenu = () => {
    sideNavMenuButton.setAttribute(ARIA_EXPANDED_ATTR, "true")
    sideNavAccordion.classList.add(DISPLAY_NONE_CLASS)
    isExpanded = false
  }

  const handleClick = () => {
    return isExpanded ? closeNavMenu() : openNavMenu()
  }

  const handleResizeFn = () => {
    if (!isNarrow() && !isExpanded) openNavMenu()
  }

  const handleResize = throttle(handleResizeFn, 50)

  return {
    init() {
      sideNavMenuButton.addEventListener("click", handleClick)
      window.addEventListener("resize", handleResize)

      if (isNarrow()) closeNavMenu()
    },
  }
}

document.addEventListener("DOMContentLoaded", () => {
  SidebarCollapsibles().init()
  Undernet.start(null, true)
  // Undernet.COMPONENT_NAME.start("new-tooltip")
  // Undernet.COMPONENT_NAME.stop("new-tooltip")
  // Test scoping:
  // Undernet.start(".article-wrapper", true)
  // Undernet.start("#side-nav", true)
  MobileMenu().init()
})
