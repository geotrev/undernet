import React from "react"
import Github from "react-feather/dist/icons/github"
import Twitter from "react-feather/dist/icons/twitter"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import { docPages, rootPath } from "app/routes"
import Logo from "app/assets/images/un-logo.png"
import "./styles.scss"

export default function GlobalNav(props) {
  const handleClick = event => {
    event.preventDefault()
    props.handleRefocusClick(props.mainRef)
  }

  return (
    <nav id="global-nav" className="is-fluid grid">
      <ul className="nav-list row has-no-p">
        <li className="is-sm-5 is-xs-12 column" role="none">
          <Link to={rootPath} className="logo" role="menuitem">
            <img src={Logo} alt="Undernet" />
          </Link>
        </li>
        <li className="is-sm-7 is-xs-12 column">
          <ul className="row">
            <li role="none">
              <button
                role="menuitem"
                className="is-visually-hidden-focusable"
                onClick={handleClick}
                type="button"
              >
                {"Skip to main content"}
              </button>
            </li>
            <li role="none">
              <a className="has-feather" href="https://www.twitter.com/gwtrev" role="menuitem">
                <Twitter role="presentation" focusable="false" />
                <span className="is-visually-hidden">{"Open link to www.twitter.com/gwtrev"}</span>
              </a>
            </li>
            <li role="none">
              <a
                className="has-feather"
                href="https://www.github.com/geotrev/undernet"
                role="menuitem"
              >
                <Github role="presentation" focusable="false" />
                <span className="is-visually-hidden">
                  {"Open link to www.github.com/geotrev/undernet"}
                </span>
              </a>
            </li>
            <li role="none">
              <a href={docPages.introduction} role="menuitem">
                {"Documentation"}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}

GlobalNav.propTypes = {
  handleRefocusClick: PropTypes.func.isRequired,
  mainRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
}
