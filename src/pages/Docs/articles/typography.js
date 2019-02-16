import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import TypographyMd from "docs/typography.md"

const Typography = () => {
  return (
    <Fragment>
      <SetTitle
        title="Typography"
        description="Use typography elements for displaying readable content."
      />
      <Article>{TypographyMd}</Article>
    </Fragment>
  )
}

export default Typography
