import React from "react"
import Spinner from "react-spinkit"
import "./LoadingSpinner.scss"

const SPINNER_COLOR = "#d15ded"

const LoadingSpinner = () => (
  <div className="has-padding-4" id="loading-spinner">
    <Spinner name="folding-cube" color={SPINNER_COLOR} fadeIn="none" />
  </div>
)

export default LoadingSpinner
