import React from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import OffsetOrderMd from "app/docs/offset-order.md"

const OffsetOrder = () => {
  return (
    <React.Fragment>
      <SetMeta
        title="Offsets & Ordering"
        description="Change the grid and re-order content using offset and flex order class helpers."
      />
      <PageHeader>Offset & Order</PageHeader>
      <Article>{OffsetOrderMd}</Article>
    </React.Fragment>
  )
}

export default OffsetOrder
