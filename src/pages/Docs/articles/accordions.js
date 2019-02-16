import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import AccordionsMd from "docs/accordions.md"

const Accordions = () => {
  return (
    <Fragment>
      <SetMeta
        title="Accordions"
        description="A component for hiding and showing content in an accordion-style user interface."
      />
      <PageHeader>Accordions</PageHeader>
      <Article>{AccordionsMd}</Article>
    </Fragment>
  )
}

export default Accordions
