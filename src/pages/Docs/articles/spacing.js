import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import SpacingMd from "docs/spacing.md"

const Spacing = () => {
  return (
    <Fragment>
      <SetTitle
        title="Spacing"
        description="Create custom spaced paddings and margins for page elements using spacing class helpers."
      />
      <Article>{SpacingMd}</Article>
    </Fragment>
  )
}

export default Spacing
