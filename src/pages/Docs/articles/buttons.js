import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import ButtonsMd from "docs/buttons.md"

const Buttons = () => {
  return (
    <Fragment>
      <SetTitle
        title="Buttons"
        description="Use button elements and class helpers for consistent interactions."
      />
      <Article>{ButtonsMd}</Article>
    </Fragment>
  )
}

export default Buttons
