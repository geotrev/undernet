import React, { Fragment } from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import DropdownsMd from "app/docs/dropdowns.md"

const Dropdowns = () => {
  return (
    <Fragment>
      <SetMeta
        title="Dropdowns"
        description="A component for nesting menu buttons within a menu button user interface."
      />
      <PageHeader>Dropdowns</PageHeader>
      <Article>{DropdownsMd}</Article>
    </Fragment>
  )
}

export default Dropdowns
