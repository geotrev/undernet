import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Overview.scss';

export default class Overview extends Component {
  render() {
    return (
      <div className="overview-wrapper">
        <h1>You found a components page!</h1>
        <p>{this.props.text}</p>
      </div>
    );
  }
}
