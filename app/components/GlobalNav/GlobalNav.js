import React from "react"
import Github from "react-feather/dist/icons/github"
import Twitter from "react-feather/dist/icons/twitter"
import { Link } from "react-router-dom"

import { introductionPath } from "routes"
import Logo from "assets/images/un-logo.png"
import "./styles.scss"

export default function GlobalNav() {
  return (
    <nav id="global-nav" className="fluid grid">
      <ul className="nav-list row has-no-padding">
        <li className="small-5 xsmall-12 columns">
          <Link to="/" className="logo">
            <img src={Logo} alt="Undernet" />
          </Link>
        </li>
        <li className="small-7 xsmall-12 columns">
          <ul className="row">
            <li>
              <a className="has-feather" href="https://www.twitter.com/gwtrev">
                <Twitter role="presentation" focusable="false" />
                <span className="is-visually-hidden">Open link to www.twitter.com/gwtrev</span>
              </a>
            </li>
            <li>
              <a className="has-feather" href="https://www.github.com/geotrev/undernet">
                <Github role="presentation" focusable="false" />
                <span className="is-visually-hidden">
                  Open link to www.github.com/geotrev/undernet
                </span>
              </a>
            </li>
            <li>
              <Link to={introductionPath}>Documentation</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}
