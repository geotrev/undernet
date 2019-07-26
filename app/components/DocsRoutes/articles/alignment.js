import React, { Fragment } from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import AlignmentMd from "app/docs/alignment.md"

const Alignment = () => {
  return (
    <Fragment>
      <SetMeta
        title="Alignment"
        description="Utilities for creating custom alignment in web layouts."
      />
      <PageHeader>Alignment</PageHeader>
      <Article>{AlignmentMd}</Article>
    </Fragment>
  )
}

export default Alignment
