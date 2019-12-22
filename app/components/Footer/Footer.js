import React from "react"
import { GitHub, Twitter } from "react-feather"
import PropTypes from "prop-types"

import "./styles.scss"

export default function Footer(props) {
  const handleClick = event => {
    event.preventDefault()
    props.handleRefocusClick(props.headerRef)
  }

  return (
    <div className="footer-wrapper is-section-sm is-fluid grid">
      <div className="row">
        <div className="has-no-p column">
          <p className="has-no-m-block-end has-text-center has-gray900-text-color">
            {"Undernet is a front-end framework created and maintained by "}
            <a className="has-white-text-color" href="https://geotrev.com">
              {"George Treviranus"}
            </a>
            {"."}
          </p>
          <p className="has-no-m-block-end has-text-center has-gray900-text-color">
            {"Animations provided by "}
            <a className="has-white-text-color" href="https://folgert.com/">
              {"Gavin Folgert"}
            </a>
            {". ❤️"}
          </p>
          <ul className="has-text-center has-no-p has-gray900-text-color has-unstyled-list has-direction-row is-d-flex has-justify-content-center">
            <li className="has-no-p" role="none">
              <a
                role="menuitem"
                className="has-white-text-color has-feather"
                href="https://www.twitter.com/gwtrev"
              >
                <Twitter role="presentation" focusable="false" />
                <span className="is-visually-hidden">{"Open link to www.twitter.com/gwtrev"}</span>
              </a>
            </li>
            <li className="has-no-p" role="none">
              <a
                role="menuitem"
                className="has-white-text-color has-feather"
                href="https://www.github.com/geotrev/undernet"
              >
                <GitHub role="presentation" focusable="false" />
                <span className="is-visually-hidden">
                  {"Open link to www.github.com/geotrev/undernet"}
                </span>
              </a>
            </li>
            <li className="has-no-p" role="none">
              <button
                className="is-visually-hidden-focusable"
                onClick={handleClick}
                role="menuitem"
                type="button"
              >
                {"Return to top of page"}
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
