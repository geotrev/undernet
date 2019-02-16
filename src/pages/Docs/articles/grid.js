import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import GridMd from "docs/grid.md"

const Grid = () => {
  return (
    <Fragment>
      <SetTitle
        title="Grid"
        description="Use the flex grid utility classes for creating responsive, complex layouts with minimal effort."
      />
      <Article>{GridMd}</Article>
    </Fragment>
  )
}

export default Grid
