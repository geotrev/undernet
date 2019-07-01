import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import DownloadMd from "docs/download.md"

const Download = () => {
  return (
    <Fragment>
      <SetMeta
        title="Download"
        description="Download using cdn, npm, or get the raw source code assets for your static website."
      />
      <PageHeader>Download</PageHeader>
      <Article>{DownloadMd}</Article>
    </Fragment>
  )
}

export default Download
