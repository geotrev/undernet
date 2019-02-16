import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import FormsMd from "docs/forms.md"

const Forms = () => {
  return (
    <Fragment>
      <SetTitle
        title="Forms"
        description="Use form elements and helper classes for consistent user input and textual feedback."
      />
      <Article>{FormsMd}</Article>
    </Fragment>
  )
}

export default Forms
