import React, { useState, useEffect } from "react"
import classNames from "classnames"
import throttle from "lodash/throttle"
import { NavLink } from "react-router-dom"
import Menu from "react-feather/dist/icons/menu"
import ChevronRight from "react-feather/dist/icons/chevron-right"

import { NAV_DATA } from "./constants"
import { Accordions } from "undernet"
import "./styles.scss"

const pkg = require("projectRoot/package.json")
const MENU_COLLAPSE_WIDTH = 1199

export default function SideNav() {
  // set up effects and state

  const getWindowInnerWidth = () => window.innerWidth
  const isLargerThanCollapseWidth = () => getWindowInnerWidth() > MENU_COLLAPSE_WIDTH
  const [menuIsOpen, setMenuIsOpen] = useState(isLargerThanCollapseWidth())

  const handleMenuVisibility = () => {
    if (isLargerThanCollapseWidth()) {
      setMenuIsOpen(true)
    }
  }

  const handleMenuVisibilityThrottled = throttle(handleMenuVisibility, 50)

  const componentUnmountFunction = () => {
    window.removeEventListener("resize", handleMenuVisibilityThrottled)
    Accordions.stop()
  }

  const observedStateOnMount = []
  useEffect(() => {
    Accordions.start()
    window.addEventListener("resize", handleMenuVisibilityThrottled)
    setMenuIsOpen(isLargerThanCollapseWidth())

    return componentUnmountFunction
  }, observedStateOnMount)

  const observedStateOnUpdate = [menuIsOpen]
  useEffect(() => {
    Accordions.stop()
    Accordions.start()
  }, observedStateOnUpdate)

  // set up handlers and other helper methods

  const handleCollapseClick = () => {
    if (getWindowInnerWidth() <= MENU_COLLAPSE_WIDTH) {
      setMenuIsOpen(false)
    }
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
    return classNames("row side-nav-menu accordion has-p-lg", {
      "is-d-none": !menuIsOpen,
    })
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

  // render content

  const renderAccordionChildLink = item => {
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

  const renderAccordionRow = (section, index) => {
    const listItems = section.links.map(renderAccordionChildLink)

    return (
      <React.Fragment key={section.header}>
        <h4 className="paragraph">
          <button
            id={`nav-acc-button${index}`}
            data-parent="side-nav-accordion"
            className="accordion-button"
            data-target={`nav-acc-content${index}`}
          >
            {section.header}
          </button>
        </h4>
        <ul className="accordion-content" id={`nav-acc-content${index}`}>
          {listItems}
        </ul>
      </React.Fragment>
    )
  }

  const renderNavAccordion = () => {
    return NAV_DATA.map((section, i) => {
      return (
        <div
          data-visible={accordionIsActive(section.links) ? "true" : "false"}
          data-accordion-row={`nav-acc-content${i}`}
          className="accordion-row is-xs-12 column has-no-p"
          key={section.links[0].url}
        >
          {renderAccordionRow(section, i)}
        </div>
      )
    })
  }

  return (
    <div className="is-xs-12 is-xl-2 column has-no-p" id="side-nav">
      <div className="is-fluid grid side-nav-wrapper">
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

        <nav data-accordion="side-nav-accordion" className={menuClasses()} id="side-nav-wrapper">
          <p className="version-text has-no-p has-gray800-text-color is-xs-12 column">
            Version {pkg.version}
          </p>
          {renderNavAccordion()}
        </nav>
      </div>
    </div>
  )
}
