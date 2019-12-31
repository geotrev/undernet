import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import FormsMd from "app/docs/forms.md"

const Forms = () => {
  return (
    <>
      <SetMeta
        title="Forms"
        description="Use form elements and helper classes for consistent user input and textual feedback."
      />
      <PageHeader>Forms</PageHeader>
      <Article name="Forms">{FormsMd}</Article>
    </>
  )
}

export default Forms
