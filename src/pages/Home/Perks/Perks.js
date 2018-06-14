import React, { Component } from "react"

import { Link } from "react-router-dom"
import ChevronRight from "react-feather/dist/icons/chevron-right"

const Perks = () => (
  <div className="row">
    <div className="xsmall-12 columns has-center-text">
      <h1 className="h3">Build websites. Simply.</h1>
    </div>

    <div className="xsmall-12 columns has-center-text">
      <Link to="docs/getting-started" className="medium button has-feather">
        Download <ChevronRight size={20} />
      </Link>
      <Link to="docs/overview" className="primary medium button has-feather">
        Learn More <ChevronRight size={20} />
      </Link>
    </div>

    <div className="xsmall-12 columns">
      <p>badges here eventually</p>
    </div>
  </div>
)

export default Perks
