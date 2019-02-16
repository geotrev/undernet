import React, { createRef, Component } from "react"
import { withLastLocation } from "react-router-last-location"
import PropTypes from "prop-types"

class PageHeader extends Component {
  constructor(props) {
    super(props)
    this.headerRef = createRef()
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  }

  componentDidMount() {
    // Don't handle focus on the h1 because there is no history yet.
    if (!this.props.lastLocation) return

    this.headerRef.current.focus()
    this.headerRef.current.addEventListener("blur", this.handleHeaderBlur)
  }

  handleHeaderBlur = () => {
    // Restore default tabindex value once the user has taken focus away from the h1.
    this.headerRef.current.removeAttribute("tabindex")
    this.headerRef.current.removeEventListener("blur", this.handleHeaderBlur)
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
