import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import JavaScriptMd from "docs/javascript.md"

const JavaScript = () => {
  return (
    <Fragment>
      <SetMeta
        title="JavaScript"
        description="Strategies for importing and using Undernet's JavaScript components."
      />
      <PageHeader>JavaScript</PageHeader>
      <Article>{JavaScriptMd}</Article>
    </Fragment>
  )
}

export default JavaScript
