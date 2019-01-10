import React from "react"
import ScaleLoader from "react-spinners/ScaleLoader"

import "./styles.scss"

const SPINNER_COLOR = "#d15ded"

const LoadingSpinner = () => (
  <div id="loading-spinner">
    <ScaleLoader color={SPINNER_COLOR} />
  </div>
)

export default LoadingSpinner
