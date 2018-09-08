import React from "react"
import "./Docs.scss"

import { ScrollUpOnMount } from "helpers"
import { SideNav } from "components"
import DocsRoutes from "./DocsRoutes/DocsRoutes"

const Docs = () => {
  const navItems = [
    {
      header: "Overview",
      links: [
        { name: "Introduction", url: "/docs/overview/introduction" },
        { name: "Download", url: "/docs/overview/download" },
        { name: "Branding", url: "/docs/overview/branding" },
        { name: "JavaScript", url: "/docs/overview/javascript" },
        { name: "Accessibility", url: "/docs/overview/accessibility" },
      ],
    },
    {
      header: "Elements",
      links: [
        { name: "Grid", url: "/docs/elements/grid" },
        { name: "Typography", url: "/docs/elements/typography" },
        { name: "Buttons", url: "/docs/elements/buttons" },
        { name: "Forms", url: "/docs/elements/forms" },
      ],
    },
    {
      header: "Components",
      links: [
        { name: "Modals", url: "/docs/components/modals" },
        { name: "Accordions", url: "/docs/components/accordions" },
      ],
    },
    {
      header: "Utilities",
      links: [
        { name: "Alignment", url: "/docs/utilities/alignment" },
        { name: "Offset / Order", url: "/docs/utilities/offset-order" },
        { name: "Text", url: "/docs/utilities/text" },
        { name: "Display", url: "/docs/utilities/display" },
        { name: "Color", url: "/docs/utilities/color" },
        { name: "Spacing", url: "/docs/utilities/spacing" },
      ],
    },
  ]

  return (
    <div id="docs" className="medium-section fluid grid">
      <ScrollUpOnMount />
      <div className="row">
        <SideNav navListClasses="xsmall-12 columns has-no-padding" navItems={navItems} />

        <div className="xsmall-12 xlarge-10 has-no-padding columns">
          <DocsRoutes />
        </div>
      </div>
    </div>
  )
}

export default Docs
