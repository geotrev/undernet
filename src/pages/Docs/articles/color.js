import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import ColorMd from "docs/color.md"

const Color = () => {
  return (
    <Fragment>
      <SetTitle
        title="Color"
        description="Utilities for adding custom colored text and backgrounds using class helpers."
      />
      <Article>{ColorMd}</Article>
    </Fragment>
  )
}

export default Color
