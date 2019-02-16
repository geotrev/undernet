import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import AlignmentMd from "docs/alignment.md"

const Alignment = () => {
  return (
    <Fragment>
      <SetTitle
        title="Alignment"
        description="Utilities for creating custom alignment in web layouts."
      />
      <Article>{AlignmentMd}</Article>
    </Fragment>
  )
}

export default Alignment
