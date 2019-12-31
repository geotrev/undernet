import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import SpacingMd from "app/docs/spacing.md"

const Spacing = () => {
  return (
    <>
      <SetMeta
        title="Spacing"
        description="Create custom spaced paddings and margins for page elements using spacing class helpers."
      />
      <PageHeader>Spacing</PageHeader>
      <Article name="Spacing">{SpacingMd}</Article>
    </>
  )
}

export default Spacing
