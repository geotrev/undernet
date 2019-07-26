import React from "react"

import SideNav from "app/components/SideNav"
import DocsRoutes from "app/components/DocsRoutes"
import { NAV_DATA } from "app/pages/Docs/navData"
import "./styles.scss"

export default function Docs() {
  return (
    <div id="docs" className="fluid grid has-no-padding">
      <div className="row">
        <SideNav navListClasses="xsmall-12 columns has-no-padding" navItems={NAV_DATA} />
        <div className="xsmall-12 xlarge-10 columns has-padding-3">
          <DocsRoutes />
        </div>
      </div>
    </div>
  )
}
