import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import AlignmentMd from "app/docs/alignment.md"

const Alignment = () => {
  return (
    <>
      <SetMeta
        title="Alignment"
        description="Utilities for creating custom alignment in web layouts."
      />
      <PageHeader>Alignment</PageHeader>
      <Article name="Alignment">{AlignmentMd}</Article>
    </>
  )
}

export default Alignment
