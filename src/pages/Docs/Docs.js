import React from "react"
import "./Docs.scss"

import { SideNav } from "components"
import DocsRoutes from "./DocsRoutes/DocsRoutes"
import { ITEMS } from "./docs-nav-items"

export default function Docs() {
  return (
    <div id="docs" className="medium-section fluid grid">
      <div className="row">
        <SideNav navListClasses="xsmall-12 columns has-no-padding" navItems={ITEMS} />
        <div className="xsmall-12 xlarge-10 has-no-padding columns">
          <DocsRoutes />
        </div>
      </div>
    </div>
  )
}
