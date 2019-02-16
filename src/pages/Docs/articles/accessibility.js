import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import AccessibilityMd from "docs/accessibility.md"

const Accessibility = () => {
  return (
    <Fragment>
      <SetMeta
        title="Accessibility"
        description="Notes and helpers for creating a more accessible and user-friendly website."
      />
      <PageHeader>Accessibility</PageHeader>
      <Article>{AccessibilityMd}</Article>
    </Fragment>
  )
}

export default Accessibility
