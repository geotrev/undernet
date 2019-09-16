import React, { Fragment } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import throttle from "lodash/throttle"
import { NavLink } from "react-router-dom"
import Menu from "react-feather/dist/icons/menu"
import ChevronRight from "react-feather/dist/icons/chevron-right"
import { Accordions } from "undernet"

import "./styles.scss"

const pkg = require("projectRoot/package.json")
const MENU_COLLAPSE_WIDTH = 1199

export default class SideNav extends React.Component {
  constructor(props) {
    super(props)
    this.handleMenuVisibility = throttle(this.handleMenuVisibility, 50)

    this.state = {
      menuIsOpen: window.innerWidth > MENU_COLLAPSE_WIDTH,
    }
  }

  static propTypes = {
    navItems: PropTypes.arrayOf(
      PropTypes.shape({
        header: PropTypes.string,
        links: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string,
          })
        ),
      })
    ).isRequired,
    navListClasses: PropTypes.string,
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleMenuVisibility)

    const menuIsOpen = window.innerWidth > MENU_COLLAPSE_WIDTH
    this.setState({ menuIsOpen })

    Accordions.start()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleMenuVisibility)
    Accordions.stop()
  }

  componentDidUpdate(_, prevState) {
    if (prevState.menuIsOpen !== this.state.menuIsOpen) {
      Accordions.stop()
      Accordions.start()
    }
  }

  handleCollapseClick = () => {
    if (window.innerWidth <= MENU_COLLAPSE_WIDTH) {
      this.setState({ menuIsOpen: false })
    }
  }

  handleMenuVisibility = () => {
    if (window.innerWidth > MENU_COLLAPSE_WIDTH) {
      this.setState({ menuIsOpen: true })
    }
  }

  handleMenuToggleClick = event => {
    event.preventDefault()
    this.setState({ menuIsOpen: !this.state.menuIsOpen })
  }

  get buttonClasses() {
    return classNames("is-justified-center is-aligned-center is-flex is-hidden-xlarge", {
      "rotate-180": !this.state.menuIsOpen,
    })
  }

  get menuClasses() {
    return classNames("row side-nav-menu accordion has-padding-3", {
      "is-hidden": !this.state.menuIsOpen,
    })
  }

  accordionIsActive(items) {
    let isActive = false

    items.forEach(item => {
      if (window.location.href.includes(item.url)) {
        isActive = true
      }
    })

    return isActive
  }

  renderAccordionChildLink = item => {
    return (
      <li key={item.name} role="none">
        <NavLink
          role="listitem"
          className="side-nav-link-item has-black-text is-flex is-aligned-center"
          activeClassName="active"
          onClick={this.handleCollapseClick}
          to={item.url}
        >
          {item.name} <ChevronRight size={16} role="presentation" focusable="false" />
        </NavLink>
      </li>
    )
  }

  renderAccordionRow(section, index) {
    const listItems = section.links.map(this.renderAccordionChildLink)

    return (
      <Fragment key={section.header}>
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
      </Fragment>
    )
  }

  renderNavAccordion() {
    return this.props.navItems.map((section, i) => {
      return (
        <div
          data-visible={this.accordionIsActive(section.links) ? "true" : "false"}
          data-accordion-row={`nav-acc-content${i}`}
          className={classNames("accordion-row", this.props.navListClasses)}
          key={section.links[0].url}
        >
          {this.renderAccordionRow(section, i)}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="xsmall-12 xlarge-2 columns has-no-padding" id="side-nav">
        <div className="fluid grid side-nav-wrapper">
          <div className="row is-flex is-hidden-xlarge side-nav-expand">
            <button
              onClick={this.handleMenuToggleClick}
              className={this.buttonClasses}
              aria-controls="side-nav-wrapper"
              aria-expanded={this.state.menuIsOpen}
            >
              <Menu size={20} role="presentation" focusable="false" />{" "}
              <span className="has-black-text">Explore</span>
            </button>
          </div>

          <nav
            data-accordion="side-nav-accordion"
            className={this.menuClasses}
            id="side-nav-wrapper"
          >
            <p className="version-text has-no-padding has-gray800-text xsmall-12 columns">
              Version {pkg.version}
            </p>
            {this.renderNavAccordion()}
          </nav>
        </div>
      </div>
    )
  }
}
