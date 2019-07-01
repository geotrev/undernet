import React, { Fragment } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import throttle from "lodash/throttle"
import { NavLink } from "react-router-dom"
import Menu from "react-feather/dist/icons/menu"
import ChevronRight from "react-feather/dist/icons/chevron-right"
import { Accordions } from "undernet"

import Button from "components/Button"
import "./styles.scss"

const pkg = require("../../../package.json")
const MENU_COLLAPSE_BREAKPOINT = 1199

export default class SideNav extends React.Component {
  constructor(props) {
    super(props)
    this.handleCurrentWidth = throttle(this.handleCurrentWidth.bind(this), 50)
  }

  state = {
    menuIsOpen: window.innerWidth > MENU_COLLAPSE_BREAKPOINT ? true : false,
    currentWindowWidth: window.innerWidth,
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
    window.addEventListener("resize", this.handleCurrentWidth)
    window.addEventListener("resize", this.handleMenuVisibility)

    const menuIsOpen = this.state.currentWindowWidth > MENU_COLLAPSE_BREAKPOINT
    this.setState({ menuIsOpen })

    Accordions.start()
  }

  componentDidUpdate() {
    Accordions.stop()
    Accordions.start()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleCurrentWidth)
    window.removeEventListener("resize", this.handleMenuVisibility)
    Accordions.stop()
  }

  handleCollapseClick = () => {
    if (this.state.currentWindowWidth <= MENU_COLLAPSE_BREAKPOINT) {
      this.setState({ menuIsOpen: false })
    }
  }

  handleCurrentWidth = () => {
    this.setState({
      currentWindowWidth: window.innerWidth,
    })
  }

  handleMenuVisibility = () => {
    if (this.state.currentWindowWidth > MENU_COLLAPSE_BREAKPOINT) {
      this.setState({ menuIsOpen: true })
    }
  }

  handleClick = event => {
    event.preventDefault()
    this.setState({ menuIsOpen: !this.state.menuIsOpen })
  }

  getButtonClasses() {
    return classNames("is-justified-center is-aligned-center is-flex is-hidden-xlarge", {
      "rotate-180": !this.state.menuIsOpen,
    })
  }

  getMenuClasses() {
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

  renderAccordionChildLink(item) {
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

  renderAccordionRow(section, index, listItems) {
    return (
      <Fragment key={section.header}>
        <h4 className="paragraph">
          <Button
            id={`nav-acc-button${index}`}
            dataParent="side-nav-accordion"
            className="accordion-button"
            dataTarget={`nav-acc-content${index}`}
            role="listitem"
          >
            {section.header}
          </Button>
        </h4>
        <ul className="accordion-content" id={`nav-acc-content${index}`}>
          {listItems}
        </ul>
      </Fragment>
    )
  }

  renderNavAccordion() {
    return this.props.navItems.map((section, i) => {
      const listItems = section.links.map((item, j) => {
        return this.renderAccordionChildLink(item, j)
      })

      return (
        <div
          data-visible={this.accordionIsActive(section.links) ? "true" : "false"}
          data-accordion-row={`nav-acc-content${i}`}
          className={classNames("accordion-row", this.props.navListClasses)}
          key={section.links[0].url}
        >
          {this.renderAccordionRow(section, i, listItems)}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="xsmall-12 xlarge-2 columns has-no-padding" id="side-nav">
        <div className="fluid grid side-nav-wrapper">
          <div className="row is-flex is-hidden-xlarge side-nav-expand">
            <Button onClick={this.handleClick} href="#" className={this.getButtonClasses()}>
              <Menu size={20} role="presentation" focusable="false" />{" "}
              <span className="has-black-text">Explore</span>
            </Button>
          </div>

          <nav data-accordion="side-nav-accordion" className={this.getMenuClasses()}>
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
