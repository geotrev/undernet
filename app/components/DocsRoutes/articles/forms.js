import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import FormsMd from "docs/forms.md"

const Forms = () => {
  return (
    <Fragment>
      <SetMeta
        title="Forms"
        description="Use form elements and helper classes for consistent user input and textual feedback."
      />
      <PageHeader>Forms</PageHeader>
      <Article>{FormsMd}</Article>
    </Fragment>
  )
}

export default Forms
