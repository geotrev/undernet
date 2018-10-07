import React from "react"
import "./LoadingSpinner.scss"
import ScaleLoader from "react-spinners/ScaleLoader"

const SPINNER_COLOR = "#d15ded"

const LoadingSpinner = () => (
  <div id="loading-spinner">
    <ScaleLoader color={SPINNER_COLOR} />
  </div>
)

export default LoadingSpinner
