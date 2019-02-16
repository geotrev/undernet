import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import DisplayMd from "docs/display.md"

const Display = () => {
  return (
    <Fragment>
      <SetTitle
        title="Display"
        description="Utilities for customizing the display of page elements using class helpers."
      />
      <Article>{DisplayMd}</Article>
    </Fragment>
  )
}

export default Display
