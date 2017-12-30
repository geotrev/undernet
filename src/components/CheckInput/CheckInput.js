import React, { Component } from 'react';

export default class CheckInput extends Component {
  getLabel() {
    const warnMsg = "*** You have checkbox inputs without labels ***";
    return this.props.label ? this.props.label : console.warn(warnMsg)
  }
  
  render() {
    return (
      <label htmlFor={this.props.id}>
        <input
          name={this.props.name}
          type="checkbox"
          onChange={this.props.onChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onClick={this.props.onClick}
          checked={this.props.checked}
          id={this.props.id}
          className={this.props.className}
          value={this.props.value}
        />
        {this.getLabel()}
      </label>
    );
  }
}
