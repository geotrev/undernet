import React, { Fragment } from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import DisplayMd from "app/docs/display.md"

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
