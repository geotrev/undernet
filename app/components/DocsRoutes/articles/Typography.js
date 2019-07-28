import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import TypographyMd from "app/docs/typography.md"

const Typography = () => {
  return (
    <React.Fragment>
      <SetMeta
        title="Typography"
        description="Use typography elements for displaying readable content."
      />
      <PageHeader>Typography</PageHeader>
      <Article>{TypographyMd}</Article>
    </React.Fragment>
  )
}

export default Typography