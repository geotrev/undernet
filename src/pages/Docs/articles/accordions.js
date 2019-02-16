import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import AccordionsMd from "docs/accordions.md"

const Accordions = () => {
  return (
    <Fragment>
      <SetTitle
        title="Accordions"
        description="A component for hiding and showing content in an accordion-style user interface."
      />
      <Article>{AccordionsMd}</Article>
    </Fragment>
  )
}

export default Accordions
