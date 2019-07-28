import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import DisplayMd from "app/docs/display.md"

const Display = () => {
  return (
    <React.Fragment>
      <SetMeta
        title="Display"
        description="Utilities for customizing the display of page elements using class helpers."
      />
      <PageHeader>Display</PageHeader>
      <Article>{DisplayMd}</Article>
    </React.Fragment>
  )
}

export default Display
