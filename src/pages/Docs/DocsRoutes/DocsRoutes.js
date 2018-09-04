import React, { Component } from "react"
import { Route } from "react-router-dom"

import { Article, HeaderText } from "components"
import { Link } from "react-router-dom"
import ChevronRight from "react-feather/dist/icons/chevron-right"
import { ScrollUpOnMount } from "helpers"

// import OverviewMd from "articles/Home.md"
// import GettingStartedMd from "articles/Getting-Started.md"
// import ConfigMd from "articles/Configuration.md"
// import GridMd from "articles/Grid.md"
// import TypeMd from "articles/Typography.md"
// import ButtonsMd from "articles/Buttons.md"
// import FormsMd from "articles/Forms.md"
// import StyleUtilitiesMd from "articles/Style-Utilities.md"
// import JSUtilitiesMd from "articles/JS-Utilities.md"
// import ModalsMd from "articles/Modals.md"
// import AccordionsMd from "articles/Accordions.md"

const Template = props => {
  return <div className="articles-wrapper row">{props.children}</div>
}

export default class DocsRoutes extends Component {
  render() {
    return (
      <div className="docs-routes-wrapper small-section grid">
        <div className="row">
          {/* <Route
            exact
            path="/docs/overview"
            render={() => this.renderArticle(OverviewMd, "Overview")}
          />
          <Route
            exact
            path="/docs/getting-started"
            render={() => this.renderArticle(GettingStartedMd, "Getting Started")}
          />
          <Route
            exact
            path="/docs/configuration"
            render={() => this.renderArticle(ConfigMd, "Configuration")}
          />
          <Route exact path="/docs/grid" render={() => this.renderArticle(GridMd, "Grid", true)} />
          <Route
            exact
            path="/docs/typography"
            render={() => this.renderArticle(TypeMd, "Typography", true)}
          />
          <Route
            exact
            path="/docs/buttons"
            render={() => this.renderArticle(ButtonsMd, "Buttons", true)}
          />
          <Route
            exact
            path="/docs/forms"
            render={() => this.renderArticle(FormsMd, "Forms", true)}
          />
          <Route
            exact
            path="/docs/modals"
            render={() => this.renderArticle(ModalsMd, "Modals", true)}
          />
          <Route
            exact
            path="/docs/accordions"
            render={() => this.renderArticle(AccordionsMd, "Accordions", true)}
          />
          <Route
            exact
            path="/docs/style-utilities"
            render={() => this.renderArticle(StyleUtilitiesMd, "Style Utilities")}
          />
          <Route
            exact
            path="/docs/javascript-utilities"
            render={() => this.renderArticle(JSUtilitiesMd, "JavaScript Utilities")}
          /> */}
        </div>
      </div>
    )
  }

  renderArticle(article, pageName = "", hasExample = false) {
    return (
      <div className="column">
        <ScrollUpOnMount />
        <HeaderText>{pageName}</HeaderText>
        {hasExample && this.renderExampleLink(pageName.toLowerCase())}
        <Template>
          <Article>{article}</Article>
        </Template>
      </div>
    )
  }

  renderExampleLink(page) {
    return (
      <Link className="small secondary button has-feather" to={`/examples/${page}`}>
        See Examples <ChevronRight size={16} />
      </Link>
    )
  }
}
