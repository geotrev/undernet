import React from "react"
import Github from "react-feather/dist/icons/github"
import Twitter from "react-feather/dist/icons/twitter"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import { introductionPath } from "app/routes"
import Logo from "app/assets/images/un-logo.png"
import "./styles.scss"

export default function GlobalNav(props) {
  const handleClick = event => {
    event.preventDefault()
    props.handleRefocusClick(props.mainRef)
  }

  return (
    <nav id="global-nav" className="fluid grid">
      <ul className="nav-list row has-no-padding">
        <li className="is-small-5 is-xsmall-12 column" role="none">
          <Link to="/" className="logo" role="listitem">
            <img src={Logo} alt="Undernet" />
          </Link>
        </li>
        <li className="is-small-7 is-xsmall-12 column">
          <ul className="row">
            <li role="none">
              <button
                role="listitem"
                className="is-visually-hidden-focusable"
                onClick={handleClick}
                type="button"
              >
                Skip to main content
              </button>
            </li>
            <li role="none">
              <a className="has-feather" href="https://www.twitter.com/gwtrev" role="listitem">
                <Twitter role="presentation" focusable="false" />
                <span className="is-visually-hidden">Open link to www.twitter.com/gwtrev</span>
              </a>
            </li>
            <li role="none">
              <a
                className="has-feather"
                href="https://www.github.com/geotrev/undernet"
                role="listitem"
              >
                <Github role="presentation" focusable="false" />
                <span className="is-visually-hidden">
                  Open link to www.github.com/geotrev/undernet
                </span>
              </a>
            </li>
            <li role="none">
              <a href={introductionPath} role="listitem">
                Documentation
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
