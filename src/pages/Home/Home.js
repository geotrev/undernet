import React from "react"
import "./Home.scss"
import { ScrollUpOnMount } from "helpers"

import { Link } from "react-router-dom"
import ChevronRight from "react-feather/dist/icons/chevron-right"
import Markdown from "react-markdown"
import Badges from "./badges.md"

const Home = () => {
  return (
    <div id="home" className="medium-section fluid grid">
      <ScrollUpOnMount />
      <div className="hero row">
        <div className="xsmall-12 columns has-center-text">
          <h1 className="h3">Modular front-end development. No strings.</h1>
        </div>

        <div className="xsmall-12 columns has-center-text">
          <Link to="docs/getting-started" className="medium button has-feather">
            Download <ChevronRight size={20} />
          </Link>
          <Link to="docs/overview" className="primary medium button has-gradient has-feather">
            Learn More <ChevronRight size={20} />
          </Link>
        </div>

        <div className="xsmall-12 columns has-center-text">
          <p className="un-version has-no-margin">Version 2.1.0</p>
        </div>

        <div className="xsmall-12 columns badges">
          <Markdown source={Badges} escapeHtml={false} />
        </div>
      </div>
      <div className="row" />
      <div className="row" />
    </div>
  )
}

export default Home
