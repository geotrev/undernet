import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import BrandingMd from "docs/branding.md"

const Branding = () => {
  return (
    <Fragment>
      <SetMeta
        title="Branding"
        description="Strategies for customizing the CSS' look and feel using Undernet's SCSS."
      />
      <PageHeader>Branding</PageHeader>
      <Article>{BrandingMd}</Article>
    </Fragment>
  )
}

export default Branding
