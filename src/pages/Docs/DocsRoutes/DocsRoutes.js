import React, { Component } from "react"
import { Route } from "react-router-dom"

import { Article } from "components"
import { Link } from "react-router-dom"
import ChevronRight from "react-feather/dist/icons/chevron-right"
import { ScrollUpOnMount } from "helpers"

import IntroductionMd from "articles/introduction.md"
import DownloadMd from "articles/download.md"
import BrandingMd from "articles/branding.md"
import JavaScriptMd from "articles/javascript.md"
import AccessibilityMd from "articles/accessibility.md"

import GridMd from "articles/grid.md"
import TypographyMd from "articles/typography.md"
import ButtonsMd from "articles/buttons.md"
import FormsMd from "articles/forms.md"

import AccordionsMd from "articles/accordions.md"
import ModalsMd from "articles/modals.md"

import AlignmentMd from "articles/alignment.md"
import OffsetOrderMd from "articles/offset_order.md"
import VisibilityMd from "articles/visibility.md"
import TextMd from "articles/text.md"
import DisplayMd from "articles/display.md"
import ColorMd from "articles/color.md"
import SpacingMd from "articles/spacing.md"

export default class DocsRoutes extends Component {
  render() {
    return (
      <div className="docs-routes-wrapper small-section grid">
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
            path="/docs/overview/compatibility"
            render={() => this.renderArticle(CompatibilityMd)}
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
            path="/docs/about/alignment"
            render={() => this.renderArticle(AlignmentMd)}
          />
          <Route
            exact
            path="/docs/about/offset-order"
            render={() => this.renderArticle(OffsetOrderMd)}
          />
          <Route
            exact
            path="/docs/about/visibility"
            render={() => this.renderArticle(VisibilityMd)}
          />
          <Route exact path="/docs/about/text" render={() => this.renderArticle(TextMd)} />
          <Route exact path="/docs/about/display" render={() => this.renderArticle(DisplayMd)} />
          <Route exact path="/docs/about/color" render={() => this.renderArticle(ColorMd)} />
          <Route exact path="/docs/about/spacing" render={() => this.renderArticle(SpacingMd)} />
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
