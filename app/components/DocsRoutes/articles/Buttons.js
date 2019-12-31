import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import ButtonsMd from "app/docs/buttons.md"

const Buttons = () => {
  return (
    <>
      <SetMeta
        title="Buttons"
        description="Use button elements and class helpers for consistent interactions."
      />
      <PageHeader>Buttons</PageHeader>
      <Article name="Buttons">{ButtonsMd}</Article>
    </>
  )
}

export default Buttons
