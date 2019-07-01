import React, { Fragment } from "react"
import Article from "components/Article"
import PageHeader from "components/PageHeader"
import SetMeta from "components/SetMeta"
import OffsetOrderMd from "docs/offset-order.md"

const OffsetOrder = () => {
  return (
    <Fragment>
      <SetMeta
        title="Offsets & Ordering"
        description="Change the grid and re-order content using offset and flex order class helpers."
      />
      <PageHeader>Offset & Order</PageHeader>
      <Article>{OffsetOrderMd}</Article>
    </Fragment>
  )
}

export default OffsetOrder
