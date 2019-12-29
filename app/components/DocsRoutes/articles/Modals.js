import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import ModalsMd from "app/docs/modals.md"

const Modals = () => {
  return (
    <>
      <SetMeta
        title="Modals"
        description="A component for showing content in a modal dialog user interface."
      />
      <PageHeader>Modals</PageHeader>
      <Article>{ModalsMd}</Article>
    </>
  )
}

export default Modals
