import React, { createRef } from "react"
import { withLastLocation } from "react-router-last-location"
import PropTypes from "prop-types"

import { FOCUSABLE_TABINDEX, UNFOCUSABLE_TABINDEX } from "./constants"

class PageHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = { tabIndex: UNFOCUSABLE_TABINDEX }
    this.headerRef = createRef()
  }

  static propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    lastLocation: PropTypes.object,
  }

  componentDidMount() {
    if (!this.props.lastLocation) return

    this.setState({ tabIndex: FOCUSABLE_TABINDEX }, () => {
      this.headerRef.current.focus()
    })
  }

  handleBlur = () => {
    if (this.state.tabIndex === UNFOCUSABLE_TABINDEX) return
    this.setState({ tabIndex: UNFOCUSABLE_TABINDEX })
  }

  render() {
    const { className, children } = this.props

    return (
      <h1
        onBlur={this.handleBlur}
        tabIndex={this.state.tabIndex}
        ref={this.headerRef}
        className={className}
      >
        {children}
      </h1>
    )
  }
}

export default withLastLocation(PageHeader)
