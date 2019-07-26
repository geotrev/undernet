import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import BrandingMd from "app/docs/branding.md"

const Branding = () => {
  return (
    <React.Fragment>
      <SetMeta
        title="Branding"
        description="Strategies for customizing the CSS' look and feel using Undernet's SCSS."
      />
      <PageHeader>Branding</PageHeader>
      <Article>{BrandingMd}</Article>
    </React.Fragment>
  )
}

export default Branding
