import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import TextMd from "app/docs/text.md"

const Text = () => {
  return (
    <React.Fragment>
      <SetMeta
        title="Text"
        description="Apply specific text style customizations using these class helpers."
      />
      <PageHeader>Text</PageHeader>
      <Article>{TextMd}</Article>
    </React.Fragment>
  )
}

export default Text