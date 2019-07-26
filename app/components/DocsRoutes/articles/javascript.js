import React, { Fragment } from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import JavaScriptMd from "app/docs/javascript.md"

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
