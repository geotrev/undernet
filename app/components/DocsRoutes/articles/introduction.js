import React, { Fragment } from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import IntroductionMd from "app/docs/introduction.md"

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
