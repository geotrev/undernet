import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import IntroductionMd from "docs/introduction.md"

const Introduction = () => {
  return (
    <Fragment>
      <SetTitle
        title="Introduction"
        description="Introduction to Undernet, including its story, and its guiding principles."
      />
      <Article>{IntroductionMd}</Article>
    </Fragment>
  )
}

export default Introduction
