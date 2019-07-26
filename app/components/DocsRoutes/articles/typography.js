import React, { Fragment } from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import TypographyMd from "app/docs/typography.md"

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
