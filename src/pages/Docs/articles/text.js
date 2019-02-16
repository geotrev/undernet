import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import TextMd from "docs/text.md"

const Text = () => {
  return (
    <Fragment>
      <SetMeta
        title="Text"
        description="Apply specific text style customizations using these class helpers."
      />
      <PageHeader>Text</PageHeader>
      <Article>{TextMd}</Article>
    </Fragment>
  )
}

export default Text
