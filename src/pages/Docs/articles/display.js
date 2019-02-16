import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import DisplayMd from "docs/display.md"

const Display = () => {
  return (
    <Fragment>
      <SetMeta
        title="Display"
        description="Utilities for customizing the display of page elements using class helpers."
      />
      <PageHeader>Display</PageHeader>
      <Article>{DisplayMd}</Article>
    </Fragment>
  )
}

export default Display
