import React, { Fragment } from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import ColorMd from "app/docs/color.md"

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
