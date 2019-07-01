import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import TooltipsMd from "docs/tooltips.md"

const Tooltips = () => {
  return (
    <Fragment>
      <SetMeta
        title="Tooltips"
        description="A component for showing basic text content in a small popup box."
      />
      <PageHeader>Tooltips</PageHeader>
      <Article>{TooltipsMd}</Article>
    </Fragment>
  )
}

export default Tooltips
