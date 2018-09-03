import React, { Component } from "react"
import "./SideNav.scss"

const path = require("path")
const pkg = require("../../../package.json")

import classNames from "classnames"
import { NavLink } from "react-router-dom"
import Menu from "react-feather/dist/icons/menu"
import ChevronRight from "react-feather/dist/icons/chevron-right"

import Button from "../Button/Button"

export default class SideNav extends Component {
  constructor(props) {
    super(props)
    this.state = { menuIsOpen: null }
    this.getWidth = this.getWidth.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleCollapseClick = this.handleCollapseClick.bind(this)
  }

  componentWillMount() {
    this.getWidth()
    window.addEventListener("resize", this.getWidth)

    if (window.outerWidth < 1200) {
      this.setState({ menuIsOpen: false })
    } else {
      this.setState({ menuIsOpen: true })
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getWidth)
  }

  handleCollapseClick() {
    if (window.outerWidth > 1199) return
    this.setState({ menuIsOpen: false })
  }

  getWidth() {
    if (window.outerWidth > 1199) {
      this.setState({ menuIsOpen: true })
    }
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({ menuIsOpen: !this.state.menuIsOpen })
  }

  render() {
    const buttonClasses = classNames(
      "is-justified-center is-aligned-center is-flex is-hidden-xlarge",
      {
        "rotate-180": !this.state.menuIsOpen,
      },
    )

    const menuClasses = classNames("row collapsed side-nav-menu", {
      "is-hidden": !this.state.menuIsOpen,
    })

    return (
      <div className="xsmall-12 xlarge-2 columns collapsed" id="side-nav">
        <div className="fluid grid side-nav-wrapper">
          <div className="row is-flex is-hidden-xlarge side-nav-expand">
            <Button onClick={this.handleClick} href="#" className={buttonClasses}>
              <Menu size={20} /> <span className="has-black-text">Explore</span>
            </Button>
          </div>

          <nav className={menuClasses}>
            <p className="version-text has-no-margin has-gray800-text xsmall-12 columns">
              Version {pkg.version}
            </p>
            {this.renderLists()}
          </nav>
        </div>
      </div>
    )
  }

  renderLists() {
    return this.props.navItems.map((section, i) => {
      let listItems = section.links.map((item, j) => {
        return (
          <li key={j}>
            <NavLink
              className="has-black-text is-flex is-aligned-center"
              activeClassName="active"
              onClick={this.handleCollapseClick}
              to={item.url}
            >
              {item.name} <ChevronRight size={16} />
            </NavLink>
          </li>
        )
      })

      return (
        <div className={this.props.navListClasses} key={i}>
          <ul>
            <li>
              <h4 className="paragraph">{section.header}</h4>
            </li>
            {listItems}
          </ul>
        </div>
      )
    })
  }
}
