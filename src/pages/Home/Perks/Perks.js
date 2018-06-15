import React, { Component } from "react"

import { Link } from "react-router-dom"
import ChevronRight from "react-feather/dist/icons/chevron-right"
import Markdown from "react-markdown"
import Badges from "./badges.md"

const Perks = () => (
  <div className="perks row">
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

    <div className="xsmall-12 columns badges">
      <Markdown source={Badges} escapeHtml={false} />
    </div>
  </div>
)

export default Perks
