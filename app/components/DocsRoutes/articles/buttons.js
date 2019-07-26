import React, { Fragment } from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import ButtonsMd from "app/docs/buttons.md"

const Buttons = () => {
  return (
    <Fragment>
      <SetMeta
        title="Buttons"
        description="Use button elements and class helpers for consistent interactions."
      />
      <PageHeader>Buttons</PageHeader>
      <Article>{ButtonsMd}</Article>
    </Fragment>
  )
}

export default Buttons
