import React, { Component } from "react"
import { Route } from "react-router-dom"

import Routes from "routes"

import { Article } from "components"
import { Link } from "react-router-dom"
import ChevronRight from "react-feather/dist/icons/chevron-right"
import { ScrollUpOnMount } from "helpers"

import IntroductionMd from "docs/introduction.md"
import DownloadMd from "docs/download.md"
import BrandingMd from "docs/branding.md"
import JavaScriptMd from "docs/javascript.md"
import AccessibilityMd from "docs/accessibility.md"

import GridMd from "docs/grid.md"
import TypographyMd from "docs/typography.md"
import ButtonsMd from "docs/buttons.md"
import FormsMd from "docs/forms.md"

import AccordionsMd from "docs/accordions.md"
import ModalsMd from "docs/modals.md"

import AlignmentMd from "docs/alignment.md"
import OffsetOrderMd from "docs/offset_order.md"
import TextMd from "docs/text.md"
import DisplayMd from "docs/display.md"
import ColorMd from "docs/color.md"
import SpacingMd from "docs/spacing.md"

function renderArticle(article) {
  return <Article>{article}</Article>
}

export default function DocsRoutes() {
  return (
    <div id="docs-routes" className="small-section fluid grid">
      <div className="articles-wrapper row">
        <div className="column">
          <Route
            exact
            path={Routes.docs.overview.introduction}
            render={() => renderArticle(IntroductionMd)}
          />
          <Route
            exact
            path={Routes.docs.overview.download}
            render={() => renderArticle(DownloadMd)}
          />
          <Route
            exact
            path={Routes.docs.overview.branding}
            render={() => renderArticle(BrandingMd)}
          />
          <Route
            exact
            path={Routes.docs.overview.javascript}
            render={() => renderArticle(JavaScriptMd)}
          />
          <Route
            exact
            path={Routes.docs.overview.accessibility}
            render={() => renderArticle(AccessibilityMd)}
          />
          <Route exact path={Routes.docs.elements.grid} render={() => renderArticle(GridMd)} />
          <Route
            exact
            path={Routes.docs.elements.typography}
            render={() => renderArticle(TypographyMd)}
          />
          <Route
            exact
            path={Routes.docs.elements.buttons}
            render={() => renderArticle(ButtonsMd)}
          />
          <Route exact path={Routes.docs.elements.forms} render={() => renderArticle(FormsMd)} />
          <Route
            exact
            path={Routes.docs.components.accordions}
            render={() => renderArticle(AccordionsMd)}
          />
          <Route
            exact
            path={Routes.docs.components.modals}
            render={() => renderArticle(ModalsMd)}
          />
          <Route
            exact
            path={Routes.docs.utilities.alignment}
            render={() => renderArticle(AlignmentMd)}
          />
          <Route
            exact
            path={Routes.docs.utilities.offset_order}
            render={() => renderArticle(OffsetOrderMd)}
          />
          <Route exact path={Routes.docs.utilities.text} render={() => renderArticle(TextMd)} />
          <Route
            exact
            path={Routes.docs.utilities.display}
            render={() => renderArticle(DisplayMd)}
          />
          <Route exact path={Routes.docs.utilities.color} render={() => renderArticle(ColorMd)} />
          <Route
            exact
            path={Routes.docs.utilities.spacing}
            render={() => renderArticle(SpacingMd)}
          />
        </div>
      </div>
    </div>
  )
}
