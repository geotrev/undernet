import React from "react"

import SideNav from "app/components/SideNav"
import DocsRoutes from "app/components/DocsRoutes"
import "./styles.scss"

export default function Docs() {
  return (
    <div id="docs" className="fluid grid has-no-padding">
      <div className="row">
        <SideNav />
        <div className="xsmall-12 xlarge-10 columns has-padding-3">
          <DocsRoutes />
        </div>
      </div>
    </div>
  )
}
