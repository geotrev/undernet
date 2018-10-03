import React, { Component } from "react"
import { Route } from "react-router-dom"

import Routes from "routes"

import { Article } from "components"
import { Link } from "react-router-dom"
import ChevronRight from "react-feather/dist/icons/chevron-right"

import {
  Introduction,
  Download,
  Branding,
  JavaScript,
  Accessibility,
  Grid,
  Typography,
  Buttons,
  Forms,
  Modals,
  Accordions,
  Alignment,
  OffsetOrder,
  Text,
  Display,
  Color,
  Spacing,
} from "./articles/articles"

export default function DocsRoutes() {
  return (
    <div id="docs-routes" className="small-section fluid grid">
      <div className="articles-wrapper row">
        <div className="column">
          <Route exact path={Routes.docs.overview.introduction} component={Introduction} />
          <Route exact path={Routes.docs.overview.download} component={Download} />
          <Route exact path={Routes.docs.overview.branding} component={Branding} />
          <Route exact path={Routes.docs.overview.javascript} component={JavaScript} />
          <Route exact path={Routes.docs.overview.accessibility} component={Accessibility} />
          <Route exact path={Routes.docs.elements.grid} component={Grid} />
          <Route exact path={Routes.docs.elements.typography} component={Typography} />
          <Route exact path={Routes.docs.elements.buttons} component={Buttons} />
          <Route exact path={Routes.docs.elements.forms} component={Forms} />
          <Route exact path={Routes.docs.components.modals} component={Modals} />
          <Route exact path={Routes.docs.components.accordions} component={Accordions} />
          <Route exact path={Routes.docs.utilities.alignment} component={Alignment} />
          <Route exact path={Routes.docs.utilities.offset_order} component={OffsetOrder} />
          <Route exact path={Routes.docs.utilities.text} component={Text} />
          <Route exact path={Routes.docs.utilities.display} component={Display} />
          <Route exact path={Routes.docs.utilities.color} component={Color} />
          <Route exact path={Routes.docs.utilities.spacing} component={Spacing} />
        </div>
      </div>
    </div>
  )
}
