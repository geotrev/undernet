import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import AccordionsMd from "app/docs/accordions.md"

const Accordions = () => {
  return (
    <React.Fragment>
      <SetMeta
        title="Accordions"
        description="A component for hiding and showing content in an accordion-style user interface."
      />
      <PageHeader>Accordions</PageHeader>
      <Article>{AccordionsMd}</Article>
    </React.Fragment>
  )
}

export default Accordions
