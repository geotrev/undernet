import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import ModalsMd from "docs/modals.md"

const Modals = () => {
  return (
    <Fragment>
      <SetMeta
        title="Modals"
        description="A component for showing content in a modal dialog user interface."
      />
      <PageHeader>Modals</PageHeader>
      <Article>{ModalsMd}</Article>
    </Fragment>
  )
}

export default Modals
