import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import JavaScriptMd from "docs/javascript.md"

const JavaScript = () => {
  return (
    <Fragment>
      <SetTitle
        title="JavaScript"
        description="Strategies for importing and using Undernet's JavaScript components."
      />
      <Article>{JavaScriptMd}</Article>
    </Fragment>
  )
}

export default JavaScript
