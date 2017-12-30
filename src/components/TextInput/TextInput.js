import React, { Component } from 'react';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    })
  }
  
  getTag() {
    if (this.props.textarea === "true") {
      return "textarea";
    } else {
      return "input";
    }
  }
  
  
  getInputType() {
    if (!this.props.textarea) {
      return this.props.type || "text";
    }
  }
  
  getLabel() {
    const warnMsg = "*** You have radio inputs without labels ***";
    return this.props.label ? this.props.label : console.warn(warnMsg)
  }

  render() {
    const Tag = this.getTag();
    return (
      <label htmlFor={this.props.id} className="label">
        {this.getLabel()}
        <Tag
          disabled={this.props.disabled}
          type={this.getInputType()}
          className={this.props.className}
          id={this.props.id}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChange={(e) => this.handleChange(e)}
          tabIndex={this.props.tabIndex}
          value={this.state.value}
        />
      </label>
    );
  }
}
