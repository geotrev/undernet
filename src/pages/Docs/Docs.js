import React from "react"
import "./Docs.scss"

import { ScrollUpOnMount } from "helpers"
import { SideNav } from "components"
import DocsRoutes from "./DocsRoutes/DocsRoutes"

const Docs = () => {
  const navItems = [
    {
      header: "Getting Started",
      links: [
        { name: "Overview", url: "/docs/overview" },
        { name: "Download", url: "/docs/download" },
        { name: "Configuration", url: "/docs/configuration" },
      ],
    },
    {
      header: "Elements",
      links: [
        { name: "Grid", url: "/docs/grid" },
        { name: "Typography", url: "/docs/typography" },
        { name: "Buttons", url: "/docs/buttons" },
        { name: "Forms", url: "/docs/forms" },
      ],
    },
    {
      header: "Helpers",
      links: [
        { name: "Classes", url: "/docs/classes" },
        { name: "Mixins", url: "/docs/mixins" },
        { name: "Functions", url: "/docs/functions" },
      ],
    },
  ]

  return (
    <div id="docs" className="medium-section fluid grid">
      <ScrollUpOnMount />
      <div className="row">
        <SideNav navListClasses="xsmall-12 small-4 xlarge-12 columns" navItems={navItems} />

        <div className="xsmall-12 xlarge-10 collapsed columns">
          <DocsRoutes />
        </div>
      </div>
    </div>
  )
}

export default Docs
