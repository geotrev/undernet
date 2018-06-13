import React from "react"
import "./Nav.scss"

import Logo from "assets/images/un-logo.png"
import Github from "react-feather/dist/icons/github"
import Twitter from "react-feather/dist/icons/twitter"
import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav className="nav-wrapper fluid grid">
      <ul className="row collapsed">
        <li className="small-5 xsmall-12 columns">
          <Link to="/">
            <img className="logo" src={Logo} alt="Undernet" />
          </Link>
        </li>
        <li className="small-7 xsmall-12 columns">
          <ul className="row">
            <li>
              <a className="has-feather" href="https://www.github.com/geotrev/undernet">
                <Github />
              </a>
            </li>
            <li>
              <Link to="/docs/overview">Docs</Link>
            </li>
            <li>
              <Link to="/examples/grid">Examples</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
