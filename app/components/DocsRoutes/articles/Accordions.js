import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import AccordionsMd from "app/docs/accordions.md"

const Accordions = () => {
  return (
    <>
      <SetMeta
        title="Accordions"
        description="A component that composes a series of collapsible containers."
      />
      <PageHeader>Accordions</PageHeader>
      <Article name="Accordions" hasAPI>
        {AccordionsMd}
      </Article>
    </>
  )
}

export default Accordions
