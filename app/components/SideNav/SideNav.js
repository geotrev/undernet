import React, { useEffect, useState } from "react"
import classNames from "classnames"
import throttle from "lodash/throttle"
import { NavLink } from "react-router-dom"
import Menu from "react-feather/dist/icons/menu"
import ChevronRight from "react-feather/dist/icons/chevron-right"
import { Accordions } from "undernet"

import { useDidMount, useWillUnmount } from "app/helpers"
import { NAV_DATA } from "./constants"
import "./styles.scss"

const pkg = require("projectRoot/package.json")
const MENU_COLLAPSE_WIDTH = 1199
const SCOPE = "#side-nav"

export default function SideNav() {
  const getWindowInnerWidth = () => window.innerWidth
  const isLargerThanCollapseWidth = () => getWindowInnerWidth() > MENU_COLLAPSE_WIDTH
  const [menuIsOpen, setMenuIsOpen] = useState(isLargerThanCollapseWidth())

  const handleMenuVisibility = () => {
    if (isLargerThanCollapseWidth()) setMenuIsOpen(true)
  }

  const handleMenuVisibilityThrottled = throttle(handleMenuVisibility, 50)

  useDidMount(() => {
    window.addEventListener("resize", handleMenuVisibilityThrottled)
    setMenuIsOpen(isLargerThanCollapseWidth())
  })

  useWillUnmount(() => {
    window.removeEventListener("resize", handleMenuVisibilityThrottled)
  })

  useEffect(() => {
    if (menuIsOpen) {
      Accordions.start(SCOPE)
    } else {
      Accordions.stop(SCOPE)
    }
  }, [menuIsOpen])

  const handleCollapseClick = () => {
    if (getWindowInnerWidth() > MENU_COLLAPSE_WIDTH) return
    setMenuIsOpen(false)
  }

  const handleMenuToggleClick = event => {
    event.preventDefault()
    setMenuIsOpen(!menuIsOpen)
  }

  const buttonClasses = () => {
    return classNames("has-justify-content-center has-align-items-center is-d-flex is-xl-d-none", {
      "rotate-180": !menuIsOpen,
    })
  }

  const menuClasses = () => {
    return classNames("row side-nav-menu accordion has-p-lg", { "is-d-none": !menuIsOpen })
  }

  const accordionIsActive = items => {
    let isActive = false

    items.forEach(item => {
      if (window.location.href.includes(item.url)) {
        isActive = true
      }
    })

    return isActive
  }

  const renderCollapsibleChildLink = item => {
    return (
      <li key={item.name} role="none">
        <NavLink
          role="menuitem"
          className="side-nav-link-item has-black-text-color is-d-flex has-align-items-center"
          activeClassName="active"
          onClick={handleCollapseClick}
          to={item.url}
        >
          {item.name} <ChevronRight size={16} role="presentation" focusable="false" />
        </NavLink>
      </li>
    )
  }

  const renderCollapsible = (section, index) => (
    <React.Fragment key={section.header}>
      <h4 className="paragraph">
        <button
          id={`nav-collapsible-trigger${index}`}
          data-parent="side-nav-accordion"
          className="collapsible-trigger"
          data-target={`nav-collapsible-content${index}`}
        >
          {section.header}
        </button>
      </h4>
      <ul className="collapsible-content" id={`nav-collapsible-content${index}`}>
        {section.links.map(renderCollapsibleChildLink)}
      </ul>
    </React.Fragment>
  )

  const renderNavCollapsibleWrapper = () => {
    return NAV_DATA.map((section, i) => (
      <div
        data-visible={accordionIsActive(section.links) ? "true" : "false"}
        data-collapsible={`nav-collapsible-content${i}`}
        className="collapsible is-xs-12 column has-no-p"
        key={section.links[0].url}
      >
        {renderCollapsible(section, i)}
      </div>
    ))
  }

  const renderMenuToggle = () => (
    <div className="row is-d-flex is-xl-d-none side-nav-expand">
      <button
        onClick={handleMenuToggleClick}
        className={buttonClasses()}
        aria-controls="side-nav-wrapper"
        aria-expanded={menuIsOpen}
      >
        <Menu size={20} role="presentation" focusable="false" />{" "}
        <span className="has-black-text-color">Explore</span>
      </button>
    </div>
  )

  return (
    <div className="is-xs-12 is-xl-2 column has-no-p" id="side-nav">
      <div className="is-fluid grid side-nav-wrapper">
        {renderMenuToggle()}

        <nav data-accordion="side-nav-accordion" className={menuClasses()} id="side-nav-wrapper">
          <p className="version-text has-no-p has-gray800-text-color is-xs-12 column">
            Version {pkg.version}
          </p>
          {renderNavCollapsibleWrapper()}
        </nav>
      </div>
    </div>
  )
}
