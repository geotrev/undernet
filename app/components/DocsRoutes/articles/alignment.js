import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import AlignmentMd from "app/docs/alignment.md"

const Alignment = () => {
  return (
    <React.Fragment>
      <SetMeta
        title="Alignment"
        description="Utilities for creating custom alignment in web layouts."
      />
      <PageHeader>Alignment</PageHeader>
      <Article>{AlignmentMd}</Article>
    </React.Fragment>
  )
}

export default Alignment
