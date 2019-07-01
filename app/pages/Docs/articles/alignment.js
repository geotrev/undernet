import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import AlignmentMd from "docs/alignment.md"

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
