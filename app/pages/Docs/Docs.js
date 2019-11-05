import React from "react"

import SideNav from "app/components/SideNav"
import DocsRoutes from "app/components/DocsRoutes"
import "./styles.scss"

export default function Docs() {
  return (
    <div id="docs" className="grid is-fluid has-no-p">
      <div className="row">
        <SideNav />
        <div className="column is-xs-12 is-xl-10 has-p-lg">
          <DocsRoutes />
        </div>
      </div>
    </div>
  )
}
