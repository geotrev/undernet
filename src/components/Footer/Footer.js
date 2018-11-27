import React from "react"
import "./Footer.scss"

import Github from "react-feather/dist/icons/github"
import Twitter from "react-feather/dist/icons/twitter"

export default function Footer() {
  return (
    <div className="footer-wrapper small-section fluid grid">
      <div className="row">
        <div className="has-no-padding column">
          <p className="has-center-text has-gray900-text">
            Undernet is front-end framework created and maintained by{" "}
            <a className="has-white-text" href="http://www.geotrev.com">
              George Treviranus
            </a>
            .
          </p>
          <p className="has-center-text has-gray900-text">
            <a className="has-white-text has-feather" href="https://www.twitter.com/gwtrev">
              <Twitter role="presentation" focusable="false" />
            </a>
            <a
              className="has-white-text has-feather"
              href="https://www.github.com/geotrev/undernet"
            >
              <Github role="presentation" focusable="false" />
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
