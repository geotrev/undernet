import React, { Component } from "react"
import PropTypes from "prop-types"
import lottie from "lottie-web"

export default class Animation extends Component {
  componentDidMount() {
    const { options } = this.props

    const { loop, autoplay, animationData } = options

    this.options = {
      container: this.container_ref,
      renderer: "svg",
      loop,
      autoplay,
      animationData,
      rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
    }

    this.options = { ...this.options, ...options }

    this.anim = lottie.loadAnimation(this.options)
  }

  componentWillUpdate(nextProps) {
    if (this.options.animationData === nextProps.options.animationData) return

    this.destroy()
    this.options = { ...this.options, ...nextProps.options }
    this.anim = lottie.loadAnimation(this.options)
  }

  componentDidUpdate() {
    if (this.props.isStopped) {
      this.stop()
    } else {
      this.play()
    }

    this.pause()
    this.setSpeed()
    this.setDirection()
  }

  componentWillUnmount() {
    this.destroy()
    this.options.animationData = null
    this.anim = null
  }

  setSpeed() {
    this.anim.setSpeed(this.props.speed)
  }

  setDirection() {
    this.anim.setDirection(this.props.direction)
  }

  play() {
    this.anim.play()
  }

  stop() {
    this.anim.stop()
  }

  pause() {
    if (this.props.isPaused && !this.anim.isPaused) {
      this.anim.pause()
    } else if (!this.props.isPaused && this.anim.isPaused) {
      this.anim.pause()
    }
  }

  destroy() {
    this.anim.destroy()
  }

  handleClickToPause = () => {
    if (this.anim.isPaused) {
      this.anim.play()
    } else {
      this.anim.pause()
    }
  }

  getSize(initial) {
    let size

    if (typeof initial === "number") {
      size = `${initial}px`
    } else {
      size = initial || "100%"
    }

    return size
  }

  render() {
    const { width, height, ariaRole, ariaLabel, isClickToPauseDisabled, title } = this.props

    const lottieStyles = {
      width: this.getSize(width),
      height: this.getSize(height),
      overflow: "hidden",
      margin: "0 auto",
      outline: "none",
      ...this.props.style,
    }

    const onClickHandler = isClickToPauseDisabled ? () => null : this.handleClickToPause

    return (
      <div
        ref={ref => (this.container_ref = ref)}
        style={lottieStyles}
        onClick={onClickHandler}
        title={title}
        role={ariaRole}
        aria-label={ariaLabel}
        tabIndex="-1"
      />
    )
  }
}

Animation.propTypes = {
  options: PropTypes.object.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isStopped: PropTypes.bool,
  isPaused: PropTypes.bool,
  speed: PropTypes.number,
  direction: PropTypes.number,
  ariaRole: PropTypes.string,
  ariaLabel: PropTypes.string,
  isClickToPauseDisabled: PropTypes.bool,
  title: PropTypes.string,
  style: PropTypes.string,
}

Animation.defaultProps = {
  isStopped: false,
  isPaused: false,
  speed: 1,
  ariaRole: "button",
  ariaLabel: "animation",
  isClickToPauseDisabled: false,
  title: "",
}
