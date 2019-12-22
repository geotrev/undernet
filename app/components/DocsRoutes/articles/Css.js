import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import CssMd from "app/docs/css.md"

const Branding = () => {
  return (
    <>
      <SetMeta
        title="Branding"
        description="Strategies for customizing the CSS' look and feel using Undernet's SCSS."
      />
      <PageHeader>CSS</PageHeader>
      <Article>{CssMd}</Article>
    </>
  )
}

export default Branding
