import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import ModalsMd from "docs/modals.md"

const Modals = () => {
  return (
    <Fragment>
      <SetTitle
        title="Modals"
        description="A component for showing content in a modal dialog user interface."
      />
      <Article>{ModalsMd}</Article>
    </Fragment>
  )
}

export default Modals
