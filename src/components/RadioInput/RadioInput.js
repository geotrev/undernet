import React, { Component } from "react"

export default class RadioInput extends Component {
  getLabel() {
    return this.props.label ? this.props.label : this.getWarning()
  }

  getWarning() {
    const warnMsg = "*** You have radio inputs without labels ***"
    if (this.props.no_label) return
    return console.warn(warnMsg)
  }

  render() {
    return (
      <label htmlFor={this.props.id}>
        <input
          name={this.props.name}
          type="radio"
          onChange={this.props.onChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onClick={this.props.onClick}
          checked={this.props.checked}
          id={this.props.id}
          className={this.props.className}
          value={this.props.value}
          no_label={this.props.no_label}
        />
        {this.getLabel()}
      </label>
    )
  }
}
