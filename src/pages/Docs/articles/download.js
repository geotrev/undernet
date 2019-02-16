import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import DownloadMd from "docs/download.md"

const Download = () => {
  return (
    <Fragment>
      <SetTitle
        title="Download"
        description="Download using cdn, npm, or get the raw source code assets for your static website."
      />
      <Article>{DownloadMd}</Article>
    </Fragment>
  )
}

export default Download
