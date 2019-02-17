import React, { createRef, Component } from "react"
import { withLastLocation } from "react-router-last-location"
import PropTypes from "prop-types"

class PageHeader extends Component {
  constructor(props) {
    super(props)
    this.headerRef = createRef()
  }

  state = { tabIndex: null }

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  }

  componentDidMount() {
    this.setState({ tabIndex: this.props.lastLocation ? "-1" : null }, () => {
      if (!this.props.lastLocation) return
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
