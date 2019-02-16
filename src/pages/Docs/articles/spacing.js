import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import SpacingMd from "docs/spacing.md"

const Spacing = () => {
  return (
    <Fragment>
      <SetMeta
        title="Spacing"
        description="Create custom spaced paddings and margins for page elements using spacing class helpers."
      />
      <PageHeader>Spacing</PageHeader>
      <Article>{SpacingMd}</Article>
    </Fragment>
  )
}

export default Spacing
