import React, { Component } from "react"

export default class Button extends Component {
  getTag() {
    return this.props.href ? "a" : "button"
  }

  getType() {
    return this.props.href || !this.props.type ? null : this.props.type
  }

  getDisabledStatus() {
    const warnMsg = "*** You can't use a `disabled` state on anchor tags ***"
    if (this.props.disabled) {
      return this.props.href ? console.warn(warnMsg) : this.props.disabled
    }
  }

  render() {
    const Tag = this.getTag()
    return (
      <Tag
        disabled={this.getDisabledStatus()}
        className={this.props.className}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onClick={this.props.onClick}
        href={this.props.href}
        type={this.getType()}
        tabIndex={this.props.tabIndex}
        id={this.props.id}
      >
        {this.props.children}
      </Tag>
    )
  }
}
