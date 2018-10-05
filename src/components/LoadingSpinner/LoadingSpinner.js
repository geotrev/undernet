import React from "react"
import Spinner from "react-spinkit"
import "./LoadingSpinner.scss"

const SPINNER_COLOR = "#d15ded"

const LOAD_STYLES = "circle,cube-grid,wave,folding-cube,three-bounce,double-bounce,wandering-cubes,chasing-dots,rotating-plane,pulse,wordpress,line-scale,line-scale-pulse-out,pacman,ball-triangle-path".split(
  ",",
)

const LoadingSpinner = () => (
  <div id="loading-spinner">
    <Spinner
      name={LOAD_STYLES[Math.floor(Math.random() * LOAD_STYLES.length)]}
      color={SPINNER_COLOR}
      fadeIn="none"
    />
  </div>
)

export default LoadingSpinner
