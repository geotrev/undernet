import React, { Component } from "react"

export default class ScrollUpOnUpdate extends Component {
  componentWillUpdate(prevProps) {
    window.scrollTo(0, 0)
  }

  render() {
    return null
  }
}
