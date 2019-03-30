import React, { createRef } from "react"
import { withLastLocation } from "react-router-last-location"
import PropTypes from "prop-types"

class PageHeader extends React.Component {
  constructor(props) {
    super(props)
    this.headerRef = createRef()
  }

  state = { tabIndex: null }

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    lastLocation: PropTypes.object,
  }

  componentDidMount() {
    if (!this.props.lastLocation) return

    this.setState({ tabIndex: "-1" }, () => {
      this.headerRef.current.focus()
      this.headerRef.current.addEventListener("blur", this.handleHeaderBlur)
    })
  }

  handleHeaderBlur = () => {
    this.headerRef.current.removeEventListener("blur", this.handleHeaderBlur)
    this.setState({ tabIndex: null })
  }

  render() {
    return (
      <h1 tabIndex={this.state.tabIndex} ref={this.headerRef} className={this.props.className}>
        {this.props.children}
      </h1>
    )
  }
}

export default withLastLocation(PageHeader)
