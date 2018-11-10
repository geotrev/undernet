import React, { Component } from "react"
import PropTypes from "prop-types"
import "./SideNav.scss"

const path = require("path")
const pkg = require("../../../package.json")

import classNames from "classnames"
import { NavLink } from "react-router-dom"
import Menu from "react-feather/dist/icons/menu"
import ChevronRight from "react-feather/dist/icons/chevron-right"

import { Button } from "components"
import Undernet from "undernet"

const MENU_COLLAPSE_BREAKPOINT = 1199

export default class SideNav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuIsOpen: null,
      currentWindowWidth: null,
    }

    this.updateMenuVisibility = this.updateMenuVisibility.bind(this)
    this.getCurrentWidth = this.getCurrentWidth.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleCollapseClick = this.handleCollapseClick.bind(this)
  }

  static propTypes = {
    navItems: PropTypes.arrayOf(
      PropTypes.shape({
        header: PropTypes.string,
        links: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string,
          }),
        ),
      }),
    ).isRequired,
    navListClasses: PropTypes.string,
  }

  componentWillMount() {
    this.getCurrentWidth()
    this.updateMenuVisibility()
  }

  componentDidMount() {
    window.addEventListener("resize", this.getCurrentWidth)
    window.addEventListener("resize", this.updateMenuVisibility)

    const menuIsOpen = this.state.currentWindowWidth > MENU_COLLAPSE_BREAKPOINT
    this.setState({ menuIsOpen })

    Undernet.Accordions.start()
  }

  componentDidUpdate() {
    Undernet.Accordions.stop()
    Undernet.Accordions.start()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getCurrentWidth)
    window.removeEventListener("resize", this.updateMenuVisibility)
    Undernet.Accordions.stop()
  }

  handleCollapseClick() {
    if (this.state.currentWindowWidth <= MENU_COLLAPSE_BREAKPOINT) {
      this.setState({ menuIsOpen: false })
    }
  }

  getCurrentWidth() {
    this.setState({
      currentWindowWidth: window.outerWidth,
    })
  }

  updateMenuVisibility() {
    if (this.state.currentWindowWidth > MENU_COLLAPSE_BREAKPOINT) {
      this.setState({ menuIsOpen: true })
    }
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({ menuIsOpen: !this.state.menuIsOpen })
  }

  getButtonClasses() {
    return classNames("is-justified-center is-aligned-center is-flex is-hidden-xlarge", {
      "rotate-180": !this.state.menuIsOpen,
    })
  }

  getMenuClasses() {
    return classNames("row side-nav-menu accordion", {
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

  renderAccordionChildLink(item, index) {
    return (
      <li key={index} role="none">
        <NavLink
          role="listitem"
          className="side-nav-link-item has-black-text is-flex is-aligned-center"
          activeClassName="active"
          onClick={this.handleCollapseClick}
          to={item.url}
        >
          {item.name} <ChevronRight size={16} />
        </NavLink>
      </li>
    )
  }

  renderAccordionRow(section, index, listItems) {
    return (
      <ul>
        <li role="none">
          <h4 id={"nav-acc-button" + index} className="paragraph">
            <Button
              dataParent="side-nav-accordion"
              className="accordion-button"
              dataTarget={"nav-acc-content" + index}
              role="listitem"
            >
              {section.header}
            </Button>
          </h4>
        </li>
        <li className="accordion-content" id={"nav-acc-content" + index}>
          <ul>{listItems}</ul>
        </li>
      </ul>
    )
  }

  renderAccordion() {
    return this.props.navItems.map((section, i) => {
      let listItems = section.links.map((item, j) => {
        return this.renderAccordionChildLink(item, j)
      })

      return (
        <div
          data-visible={this.accordionIsActive(section.links) ? "true" : "false"}
          data-accordion-row={"nav-acc-content" + i}
          className={classNames("accordion-row", this.props.navListClasses)}
          key={i}
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
              <Menu size={20} /> <span className="has-black-text">Explore</span>
            </Button>
          </div>

          <nav data-accordion="side-nav-accordion" className={this.getMenuClasses()}>
            <p className="version-text has-no-padding has-gray800-text xsmall-12 columns">
              Version {pkg.version}
            </p>
            {this.renderAccordion()}
          </nav>
        </div>
      </div>
    )
  }
}
