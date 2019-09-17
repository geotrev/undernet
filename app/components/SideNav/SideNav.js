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

  const getWindowInnerWidth = () => {
    return window.innerWidth
  }

  const isLargerThanCollapseWidth = getWindowInnerWidth() > MENU_COLLAPSE_WIDTH
  const [menuIsOpen, setMenuIsOpen] = useState(isLargerThanCollapseWidth)

  let handleMenuVisibility = () => {
    if (isLargerThanCollapseWidth) {
      setMenuIsOpen(true)
    }
  }

  handleMenuVisibility = throttle(handleMenuVisibility, 50)

  const componentUnmountFunction = () => {
    window.removeEventListener("resize", handleMenuVisibility)
    Accordions.stop()
  }

  useEffect(() => {
    Accordions.start()
    window.addEventListener("resize", handleMenuVisibility)
    setMenuIsOpen(isLargerThanCollapseWidth)

    return componentUnmountFunction
  }, [])

  useEffect(() => {
    Accordions.stop()
    Accordions.start()
  }, [menuIsOpen])

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
    return classNames("is-justified-center is-aligned-center is-flex is-hidden-xlarge", {
      "rotate-180": !menuIsOpen,
    })
  }

  const menuClasses = () => {
    return classNames("row side-nav-menu accordion has-padding-3", {
      "is-hidden": !menuIsOpen,
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
          role="listitem"
          className="side-nav-link-item has-black-text is-flex is-aligned-center"
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
          className="accordion-row xsmall-12 columns has-no-padding"
          key={section.links[0].url}
        >
          {renderAccordionRow(section, i)}
        </div>
      )
    })
  }

  return (
    <div className="xsmall-12 xlarge-2 columns has-no-padding" id="side-nav">
      <div className="fluid grid side-nav-wrapper">
        <div className="row is-flex is-hidden-xlarge side-nav-expand">
          <button
            onClick={handleMenuToggleClick}
            className={buttonClasses()}
            aria-controls="side-nav-wrapper"
            aria-expanded={menuIsOpen}
          >
            <Menu size={20} role="presentation" focusable="false" />{" "}
            <span className="has-black-text">Explore</span>
          </button>
        </div>

        <nav data-accordion="side-nav-accordion" className={menuClasses()} id="side-nav-wrapper">
          <p className="version-text has-no-padding has-gray800-text xsmall-12 columns">
            Version {pkg.version}
          </p>
          {renderNavAccordion()}
        </nav>
      </div>
    </div>
  )
}
