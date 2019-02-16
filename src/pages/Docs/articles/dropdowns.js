import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import DropdownsMd from "docs/dropdowns.md"

const Dropdowns = () => {
  return (
    <Fragment>
      <SetTitle
        title="Dropdowns"
        description="A component for nesting menu buttons within a menu button user interface."
      />
      <Article>{DropdownsMd}</Article>
    </Fragment>
  )
}

export default Dropdowns
