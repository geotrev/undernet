import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import AccessibilityMd from "docs/accessibility.md"

const Accessibility = () => {
  return (
    <Fragment>
      <SetTitle
        title="Accessibility"
        description="Notes and helpers for creating a more accessible and user-friendly website."
      />
      <Article>{AccessibilityMd}</Article>
    </Fragment>
  )
}

export default Accessibility
