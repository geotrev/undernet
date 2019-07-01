import React from "react"
import ScaleLoader from "react-spinners/ScaleLoader"

import "./styles.scss"

const SPINNER_COLOR = "#d15ded"

export default function LoadingSpinner() {
  return (
    <div id="loading-spinner">
      <ScaleLoader color={SPINNER_COLOR} />
    </div>
  )
}
