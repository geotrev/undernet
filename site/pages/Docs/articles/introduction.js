import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import IntroductionMd from "docs/introduction.md"

const Introduction = () => {
  return (
    <Fragment>
      <SetMeta
        title="Introduction"
        description="Introduction to Undernet, its story, and guiding principles."
      />
      <PageHeader>Introduction</PageHeader>
      <Article>{IntroductionMd}</Article>
    </Fragment>
  )
}

export default Introduction
