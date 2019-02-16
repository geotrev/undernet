import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import GridMd from "docs/grid.md"

const Grid = () => {
  return (
    <Fragment>
      <SetMeta
        title="Grid"
        description="Use the flex grid utility classes for creating responsive, complex layouts with minimal effort."
      />
      <PageHeader>Grid</PageHeader>
      <Article>{GridMd}</Article>
    </Fragment>
  )
}

export default Grid
