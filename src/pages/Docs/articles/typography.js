import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import TypographyMd from "docs/typography.md"

const Typography = () => {
  return (
    <Fragment>
      <SetMeta
        title="Typography"
        description="Use typography elements for displaying readable content."
      />
      <PageHeader>Typography</PageHeader>
      <Article>{TypographyMd}</Article>
    </Fragment>
  )
}

export default Typography
