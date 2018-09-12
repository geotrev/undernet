import React, { Component } from "react"
import { Route } from "react-router-dom"

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

export default class DocsRoutes extends Component {
  render() {
    return (
      <div className="docs-routes-wrapper small-section fluid grid">
        <div className="row">
          <Route
            exact
            path="/docs/overview/introduction"
            render={() => this.renderArticle(IntroductionMd)}
          />
          <Route
            exact
            path="/docs/overview/download"
            render={() => this.renderArticle(DownloadMd)}
          />
          <Route
            exact
            path="/docs/overview/branding"
            render={() => this.renderArticle(BrandingMd)}
          />
          <Route
            exact
            path="/docs/overview/javascript"
            render={() => this.renderArticle(JavaScriptMd)}
          />
          <Route
            exact
            path="/docs/overview/accessibility"
            render={() => this.renderArticle(AccessibilityMd)}
          />
          <Route exact path="/docs/elements/grid" render={() => this.renderArticle(GridMd)} />
          <Route
            exact
            path="/docs/elements/typography"
            render={() => this.renderArticle(TypographyMd)}
          />
          <Route exact path="/docs/elements/buttons" render={() => this.renderArticle(ButtonsMd)} />
          <Route exact path="/docs/elements/forms" render={() => this.renderArticle(FormsMd)} />
          <Route
            exact
            path="/docs/components/accordions"
            render={() => this.renderArticle(AccordionsMd)}
          />
          <Route exact path="/docs/components/modals" render={() => this.renderArticle(ModalsMd)} />
          <Route
            exact
            path="/docs/utilities/alignment"
            render={() => this.renderArticle(AlignmentMd)}
          />
          <Route
            exact
            path="/docs/utilities/offset-order"
            render={() => this.renderArticle(OffsetOrderMd)}
          />
          <Route exact path="/docs/utilities/text" render={() => this.renderArticle(TextMd)} />
          <Route
            exact
            path="/docs/utilities/display"
            render={() => this.renderArticle(DisplayMd)}
          />
          <Route exact path="/docs/utilities/color" render={() => this.renderArticle(ColorMd)} />
          <Route
            exact
            path="/docs/utilities/spacing"
            render={() => this.renderArticle(SpacingMd)}
          />
        </div>
      </div>
    )
  }

  renderArticle(article, pageName = "") {
    return (
      <div className="column">
        <ScrollUpOnMount />
        <div className="articles-wrapper row">
          <Article>{article}</Article>
        </div>
      </div>
    )
  }
}
