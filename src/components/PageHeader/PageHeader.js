import React, { createRef, Component } from "react"
import { withLastLocation } from "react-router-last-location"

class PageHeader extends Component {
  constructor(props) {
    super(props)
    this.headerRef = createRef()
  }

  componentDidMount() {
    if (!this.props.lastLocation) return

    this.headerRef.current.focus()
    this.headerRef.current.addEventListener("blur", this.handleHeaderBlur)
  }

  handleHeaderBlur = () => {
    this.headerRef.current.removeAttribute("tabindex")
    this.headerRef.current.removeEventListener("blur", this.handleHeaderBlur)
  }

  pageHistoryExists() {
    return window.history.length > 1
  }

  render() {
    return (
      <h1
        tabIndex={this.props.lastLocation ? "-1" : null}
        ref={this.headerRef}
        className={this.props.className}
      >
        {this.props.children}
      </h1>
    )
  }
}

export default withLastLocation(PageHeader)
