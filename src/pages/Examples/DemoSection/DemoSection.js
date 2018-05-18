import React from "react"
import { ScrollUpOnMount } from "helpers"

const DemoSection = props => {
  return (
    <div className="demo-section-wrapper small-section grid" id={props.id}>
      <ScrollUpOnMount />
      <div className="row">
        <div className="collapsed column">{props.children}</div>
      </div>
    </div>
  )
}

export default DemoSection
