import React from "react"
import "./Docs.scss"

import Routes from "routes"
import { SideNav } from "components"
import DocsRoutes from "./DocsRoutes/DocsRoutes"

const DOCS_NAV_ITEMS = [
  {
    header: "Overview",
    links: [
      { name: "Introduction", url: Routes.docs.overview.introduction },
      { name: "Download", url: Routes.docs.overview.download },
      { name: "Branding", url: Routes.docs.overview.branding },
      { name: "JavaScript", url: Routes.docs.overview.javascript },
      { name: "Accessibility", url: Routes.docs.overview.accessibility },
    ],
  },
  {
    header: "Elements",
    links: [
      { name: "Grid", url: Routes.docs.elements.grid },
      { name: "Typography", url: Routes.docs.elements.typography },
      { name: "Buttons", url: Routes.docs.elements.buttons },
      { name: "Forms", url: Routes.docs.elements.forms },
    ],
  },
  {
    header: "Components",
    links: [
      { name: "Modals", url: Routes.docs.components.modals },
      { name: "Accordions", url: Routes.docs.components.accordions },
    ],
  },
  {
    header: "Utilities",
    links: [
      { name: "Alignment", url: Routes.docs.utilities.alignment },
      { name: "Offset / Order", url: Routes.docs.utilities.offset_order },
      { name: "Text", url: Routes.docs.utilities.text },
      { name: "Display", url: Routes.docs.utilities.display },
      { name: "Color", url: Routes.docs.utilities.color },
      { name: "Spacing", url: Routes.docs.utilities.spacing },
    ],
  },
]

const Docs = () => (
  <div id="docs" className="medium-section fluid grid">
    <div className="row">
      <SideNav navListClasses="xsmall-12 columns has-no-padding" navItems={DOCS_NAV_ITEMS} />
      <div className="xsmall-12 xlarge-10 has-no-padding columns">
        <DocsRoutes />
      </div>
    </div>
  </div>
)

export default Docs
