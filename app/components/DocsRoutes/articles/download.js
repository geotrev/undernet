import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import DownloadMd from "app/docs/download.md"

const Download = () => {
  return (
    <React.Fragment>
      <SetMeta
        title="Download"
        description="Download using cdn, npm, or get the raw source code assets for your static website."
      />
      <PageHeader>Download</PageHeader>
      <Article>{DownloadMd}</Article>
    </React.Fragment>
  )
}

export default Download
