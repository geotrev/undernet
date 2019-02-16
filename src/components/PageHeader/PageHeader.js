import React, { createRef, Component } from "react"

// Limitations:
// - If the user has navigated from a different website, the h1 will be focused, foiling the pageHistoryExists() check
// -

export default class PageHeader extends Component {
  constructor(props) {
    super(props)
    this.headerRef = createRef()
  }

  componentDidMount() {
    if (!this.pageHistoryExists()) return

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
        tabIndex={this.pageHistoryExists() ? "-1" : null}
        ref={this.headerRef}
        className={this.props.className}
      >
        {this.props.children}
      </h1>
    )
  }
}
