import React from "react"
import Github from "react-feather/dist/icons/github"
import Twitter from "react-feather/dist/icons/twitter"
import PropTypes from "prop-types"

import "./styles.scss"

export default function Footer(props) {
  const handleClick = event => {
    event.preventDefault()
    props.handleRefocusClick(props.headerRef)
  }

  return (
    <div className="footer-wrapper is-small-section is-fluid grid">
      <div className="row">
        <div className="has-no-padding column">
          <p className="has-no-margin-block-end has-text-center has-gray900-text">
            Undernet is a front-end framework created and maintained by{" "}
            <a className="has-white-text" href="http://www.geotrev.com">
              George Treviranus
            </a>
            .
          </p>
          <p className="has-no-margin-block-end has-text-center has-gray900-text">
            Animations provided by{" "}
            <a className="has-white-text" href="https://folgert.com/">
              Gavin Folgert
            </a>
            . ❤️
          </p>
          <ul className="has-text-center has-no-padding has-gray900-text has-unstyled-list has-direction-row has-display-flex has-justify-content-center">
            <li className="has-no-padding" role="none">
              <a
                role="menuitem"
                className="has-white-text has-feather"
                href="https://www.twitter.com/gwtrev"
              >
                <Twitter role="presentation" focusable="false" />
                <span className="is-visually-hidden">Open link to www.twitter.com/gwtrev</span>
              </a>
            </li>
            <li className="has-no-padding" role="none">
              <a
                role="menuitem"
                className="has-white-text has-feather"
                href="https://www.github.com/geotrev/undernet"
              >
                <Github role="presentation" focusable="false" />
                <span className="is-visually-hidden">
                  Open link to www.github.com/geotrev/undernet
                </span>
              </a>
            </li>
            <li className="has-no-padding" role="none">
              <button
                className="is-visually-hidden-focusable"
                onClick={handleClick}
                role="menuitem"
                type="button"
              >
                Return to top of page
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

Footer.propTypes = {
  handleRefocusClick: PropTypes.func.isRequired,
  headerRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
}
