import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import ColorMd from "docs/color.md"

const Color = () => {
  return (
    <Fragment>
      <SetMeta
        title="Color"
        description="Utilities for adding custom colored text and backgrounds using class helpers."
      />
      <PageHeader>Color</PageHeader>
      <Article>{ColorMd}</Article>
    </Fragment>
  )
}

export default Color
