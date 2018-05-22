import React from "react"
import "./Home.scss"

import "assets/images/home-bg.jpg"
import { Link } from "react-router-dom"
import ChevronRight from "react-feather/dist/icons/chevron-right"
import { ScrollUpOnMount } from "helpers"

const Home = () => {
  return (
    <div id="home" className="medium-section fluid grid">
      <ScrollUpOnMount />
      <div className="row">
        <div className="xsmall-12 columns has-center-text">
          <h1 className="h3">The core of your next front-end project</h1>
          <h2 className="h6">Powerful, configuration-first interface development</h2>
        </div>
        <div className="xsmall-12 columns has-center-text">
          <Link to="docs/download" className="medium button has-feather">
            Download <ChevronRight size={20} />
          </Link>
          <Link to="docs/overview" className="primary medium button has-feather">
            Read Docs <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
