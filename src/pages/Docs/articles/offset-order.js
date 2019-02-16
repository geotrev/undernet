import React, { Fragment } from "react"
import Article from "components/Article"
import SetTitle from "components/SetTitle"
import OffsetOrderMd from "docs/offset-order.md"

const OffsetOrder = () => {
  return (
    <Fragment>
      <SetTitle
        title="Offsets & Ordering"
        description="Change the grid and re-order content using offset and flex order class helpers."
      />
      <Article>{OffsetOrderMd}</Article>
    </Fragment>
  )
}

export default OffsetOrder
