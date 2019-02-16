import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import BrandingMd from "docs/branding.md"

const Branding = () => {
  return (
    <Fragment>
      <SetTitle
        title="Branding"
        description="Strategies for customizing branding using Undernet's SCSS."
      />
      <Article>{BrandingMd}</Article>
    </Fragment>
  )
}

export default Branding
