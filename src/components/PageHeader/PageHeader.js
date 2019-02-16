import React, { createRef, Component } from "react"

// Limitations of this component: can't detect if the user is entering the site via bookmark or url bar directly.

export default class PageHeader extends Component {
  constructor(props) {
    super(props)
    this.headerRef = createRef()
  }

  componentDidMount() {
    if (!this.pageHistoryExists() || document.referrer) return

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
        tabIndex={this.pageHistoryExists() && !document.referrer ? "-1" : null}
        ref={this.headerRef}
        className={this.props.className}
      >
        {this.props.children}
      </h1>
    )
  }
}
