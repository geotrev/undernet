import React from "react"
import { ScrollUpOnMount } from "helpers"

const DemoSection = props => {
  return (
    <div className="demo-section-wrapper small-section grid" id={props.id}>
      <ScrollUpOnMount />
      {props.children}
    </div>
  )
}

export default DemoSection
