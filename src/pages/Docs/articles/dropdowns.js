import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import DropdownsMd from "docs/dropdowns.md"

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
