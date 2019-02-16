import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import ButtonsMd from "docs/buttons.md"

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
