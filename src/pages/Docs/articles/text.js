import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import TextMd from "docs/text.md"

const Text = () => {
  return (
    <Fragment>
      <SetTitle
        title="Text"
        description="Apply specific text style customizations using these class helpers."
      />
      <Article>{TextMd}</Article>
    </Fragment>
  )
}

export default Text
