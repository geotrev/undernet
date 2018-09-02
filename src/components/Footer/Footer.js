import React from "react"
import "./Footer.scss"

import Github from "react-feather/dist/icons/github"
import Twitter from "react-feather/dist/icons/twitter"

const Footer = () => {
  return (
    <div className="footer-wrapper small-section fluid grid">
      <div className="row">
        <div className="collapsed column">
          <p className="has-center-text">
            Undernet is front-end framework created and maintained by{" "}
            <a href="http://www.geotrev.com">George Treviranus</a>.
          </p>
          <p className="has-center-text">
            <a className="has-feather" href="https://www.twitter.com/gwtrev">
              <Twitter />
            </a>
            <a className="has-feather" href="https://www.github.com/geotrev/undernet">
              <Github />
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
