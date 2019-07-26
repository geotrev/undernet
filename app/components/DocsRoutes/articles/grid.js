import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import GridMd from "app/docs/grid.md"

const Grid = () => {
  return (
    <React.Fragment>
      <SetMeta
        title="Grid"
        description="Use the flex grid utility classes for creating responsive, complex layouts with minimal effort."
      />
      <PageHeader>Grid</PageHeader>
      <Article>{GridMd}</Article>
    </React.Fragment>
  )
}

export default Grid